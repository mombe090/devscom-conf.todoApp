import { ApiModelProperty } from '@nestjs/swagger';

export class TodoDto {
    @ApiModelProperty()
    readonly _id: string;

    @ApiModelProperty()
    readonly title: string;

    @ApiModelProperty()
    readonly desc: string;

    @ApiModelProperty()
    readonly done: boolean;
}
