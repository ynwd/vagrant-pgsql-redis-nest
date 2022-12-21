# vagrant-pgsql-redis-nest

## Init microservices

In these steps, we will create 3 applications in a nest monorepo:

- app: http transport
- svc1: redis transport
- svc2: redis transport


1. create a new app called `api`
    ```
    nest new api
    ```
2. goto api dir
    ```
    cd api
    ```
3. create microservice 1
    ```
    nest generate app svc1
    ```
4. create microservice 2
    ```
    nest generate app svc2
    ```
5. start root application
    ```
    nest start
    ```
6. start service 1
    ```
    nest start svc1
    ```
    > It will fail because there is a port conflict.
    
7. start service 2
    ```
    nest start svc2
    ```
    > it will fail because there is a port conflict.

## Message pattern implementation

In these steps we will change default http transport to redis.

1. Redis transport implementation

    Remove default implementation. Change to redis transport.

    Open `apps/svc1/src/main.ts` file:

    ```ts
    import { NestFactory } from '@nestjs/core';
    import { Svc1Module } from './svc1.module';

    async function bootstrap() {
        const app = await NestFactory.create(Svc1Module);
        await app.listen(3000);
    }
    bootstrap();
    ```
    
    Change to:
    ```ts
    import { ConfigService } from '@nestjs/config';
    import { NestFactory } from '@nestjs/core';
    import { MicroserviceOptions, Transport } from '@nestjs/microservices';
    import { Svc1Module } from './svc1.module';

    async function bootstrap() {
        const app = await NestFactory.create(Svc1Module);
        const config = app.get<ConfigService>(ConfigService);

        app.connectMicroservice<MicroserviceOptions>({
            transport: Transport.REDIS,
            options: {
            host: config.get<string>('REDIS_HOST'),
            port: config.get<number>('REDIS_PORT'),
            password: config.get<string>('REDIS_PASSWORD'),
            },
        });

        await app.startAllMicroservices();
    }
    bootstrap();

    ```
2. Import config module.

    Open `apps/svc1/src/svc1.module.ts` file:
    ```ts
    import { Module } from '@nestjs/common';
    import { Svc1Controller } from './svc1.controller';
    import { Svc1Service } from './svc1.service';

    @Module({
        imports: [],
        controllers: [Svc1Controller],
        providers: [Svc1Service],
    })
    export class Svc1Module {}

    ```

    Change to:
    ```ts
    import { Module } from '@nestjs/common';
    import { ConfigModule } from '@nestjs/config';
    import { Svc1Controller } from './svc1.controller';
    import { Svc1Service } from './svc1.service';

    @Module({
        imports: [ConfigModule.forRoot()],
        controllers: [Svc1Controller],
        providers: [Svc1Service],
    })
    export class Svc1Module {}

    ```
3. Change default controller

    Open `apps/svc1/src/svc1.controller.ts` file:

    ```ts
    import { Controller, Get } from '@nestjs/common';
    import { Svc1Service } from './svc1.service';

    @Controller()
    export class Svc1Controller {
    constructor(private readonly svc1Service: Svc1Service) {}

    @Get()
        getHello(): string {
            return this.svc1Service.getHello();
        }
    }

    ```

    Change to:
    ```ts
    import { Controller } from '@nestjs/common';
    import { MessagePattern } from '@nestjs/microservices';
    import { Svc1Service } from './svc1.service';

    @Controller()
    export class Svc1Controller {
    constructor(private readonly svc1Service: Svc1Service) {}

    @MessagePattern({ cmd: 'svc1' })
        async getSvc1(name: string): Promise<string> {
            return this.svc1Service.getHello(name);
        }
    }

    ```
4. Change default service
    
    Open `apps/svc1/src/svc1.service.ts` file:

    ```ts
    import { Injectable } from '@nestjs/common';

    @Injectable()
    export class Svc1Service {
        getHello(): string {
            return 'Hello World!';
        }
    }

    ```

    change to:
    ```ts
    import { Injectable } from '@nestjs/common';

    @Injectable()
    export class Svc1Service {
        getHello(name: string): string {
            return `Hello ${name}`;
        }
    }

    ```

5. Create ENV file.
    ```
    # REDIS
    REDIS_HOST=192.168.33.12
    REDIS_PORT=6379
    REDIS_PASSWORD=root
    ```
6. Start redis server
    ```
    vagrant up redis
    ```
7. Start app server
    ```
    nest start svc1
    ```

That's it. Next we will call above simple service from app service.

## Call microservice from http service

1. Change default `apps/api/src/main.ts` file
    ```ts
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';

    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        await app.listen(3000);
    }
    bootstrap();

    ```

    Change to:
    ```ts
    import { NestFactory } from '@nestjs/core';
    import { ApiModule } from './api.module';
    import { ConfigService } from '@nestjs/config';
    import { Logger } from '@nestjs/common';

    async function bootstrap() {
        const app = await NestFactory.create(ApiModule);
        const config = app.get<ConfigService>(ConfigService);

        await app.listen(config.get<string>('APP_PORT') || 3000, async () => {
            const appName = config.get<string>('APP_NAME');
            const logger = new Logger(appName);
            logger.log(`Application is running on: ${await app.getUrl()}`);
        });
    }
    bootstrap();

    ```
2. Change default `apps/api/src/api.module.ts`:

    ```ts
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';

    @Module({
        imports: [],
        controllers: [AppController],
        providers: [AppService],
    })
    export class AppModule {}

    ```

    Change to:
    ```ts
    import { Module } from '@nestjs/common';
    import { ApiController } from './api.controller';
    import { ApiService } from './api.service';
    import { ConfigModule, ConfigService } from '@nestjs/config';
    import { ClientsModule, Transport } from '@nestjs/microservices';

    @Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            ClientsModule.registerAsync([
            {
                name: 'GREETING_SERVICE',
                useFactory: async (configService: ConfigService) => {
                return {
                    transport: Transport.REDIS,
                    options: {
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                    password: configService.get<string>('REDIS_PASSWORD'),
                    },
                };
                },
                inject: [ConfigService],
            },
            ]),
        ],
        controllers: [ApiController],
        providers: [ApiService],
    })
    export class ApiModule {}

    ```

3. Change default `apps/api/src/api.service.ts`
    ```ts
    import { Injectable } from '@nestjs/common';

    @Injectable()
    export class AppService {
        getHello(): string {
            return 'Hello World!';
        }
    }

    ```

    Change to:
    ```ts
    import { Inject, Injectable } from '@nestjs/common';
    import { ClientProxy } from '@nestjs/microservices';

    @Injectable()
    export class ApiService {
        constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}

        getHello() {
            return `Hello world!`;
        }

        getSvc1() {
            return this.client.send({ cmd: 'svc1' }, 'getSvc1');
        }
    }

    ```
4. Change default `apps/api/src/api.controller.ts` file
    ```ts
    import { Controller, Get } from '@nestjs/common';
    import { AppService } from './app.service';

    @Controller()
    export class AppController {
        constructor(private readonly appService: AppService) {}

        @Get()
        getHello(): string {
            return this.appService.getHello();
        }
    }

    ```

    Change to:
    ```ts
    import { Controller, Get } from '@nestjs/common';
    import { ApiService } from './api.service';

    @Controller()
    export class ApiController {
        constructor(private readonly apiService: ApiService) {}

        @Get('/')
        async getHello() {
            return this.apiService.getHello();
        }

        @Get('/svc1')
        async getSvc1() {
            return this.apiService.getSvc1();
        }
    }


    ```

5. That's it. Start the server
    ```
    nest start
    ```

    Then hit the endpoint created.