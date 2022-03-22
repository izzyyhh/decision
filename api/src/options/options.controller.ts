import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { firebaseStorage } from "@src/app.module";
import { Option } from "commander";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { OptionIdInput } from "./dto/option.id";
import { OptionsService } from "./options.service";

@Controller("test")
export class OptionsController {
    constructor(private readonly optionsService: OptionsService, @InjectRepository(Option) private readonly repository: EntityRepository<Option>) {}

    @Post("test")
    @UseInterceptors(FileInterceptor("file"))
    async profile(@Body() body: OptionIdInput, @UploadedFile() file: Express.Multer.File) {
        const reference = ref(firebaseStorage, `images/${body.optionId}/${file.originalname}`);
        return await uploadBytes(reference, file.buffer)
            .then(() => {
                return getDownloadURL(reference).then(
                    (link) => {
                        return link;
                    },
                    () => {
                        return new Error("Failed");
                    },
                );
            })
            .then(async (value) => {
                if (value) {
                    const qb = this.repository.createQueryBuilder();
                    await qb.update({ thumbnailUrl: value }).where({ id: body.optionId }).execute();
                }
                return value;
            });
    }
}
