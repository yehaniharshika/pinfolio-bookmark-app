import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { BookMarkController } from "./bookMark.controller";

@Module({
    imports: [JwtModule.register({})],
    controllers:[BookMarkController],
    providers:[]
})
export class BookMarkModule{
    
}