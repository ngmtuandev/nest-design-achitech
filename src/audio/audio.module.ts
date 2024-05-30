import { Module } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { AudioController } from "./audio.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SpeechModule } from "src/speech/speech.module";
import { AudioEntity } from "./entity/audio.entity";
import { AudioRepository } from "./repo/audio.repository";
import { NgwordModule } from "@core/application-ngword";
import { WordRepository } from "@infrastructure/repository-ngword";

@Module({
    imports: [TypeOrmModule.forFeature([AudioEntity]), SpeechModule, NgwordModule],
    exports: [],
    controllers: [AudioController],
    providers: [AudioService, AudioRepository, WordRepository]
    
})
export class AudioModule {}