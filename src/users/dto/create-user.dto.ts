import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString({ message: 'Le nom doit etre une chaine de caracteres' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'le nom est requis' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(3, { message: 'Le nom doit etre au moins 3 caracteres' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MaxLength(20, { message: 'Le nom doit etre au plus 20 caracteres' })
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail({}, { message: 'Le email doit etre une address email valide' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'Le email est requis' })
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEnum(['admin', 'user'], { message: 'Le role doit etre admin ou user' })
  role?: 'admin' | 'user';
}
