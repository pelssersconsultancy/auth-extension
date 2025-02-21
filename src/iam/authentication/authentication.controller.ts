import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  /**
   * This is safer approach sending the accesstoken as a cookie
   * You will need to import Response from express
   * import { Response } from 'express';
   */
  // @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  // @Post('sign-in')
  // signIn(
  //   @Res({ passthrough: true }) response: Response,
  //   @Body() signInDto: SignInDto,
  // ) {
  //   const accessToken = await this.authService.signIn(signInDto);
  //   response.cookie('accessToken', accessToken, {
  //     secure: true,
  //     httpOnly: true,
  //     sameSite: true,
  //   });
  // }
}
