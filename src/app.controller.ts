import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("word-guess-game")
  @Render('index') // Render the index view (index.hbs, index.ejs, etc.)
  getIndexPage() {
    // Perform any necessary logic here
    
    return { title: 'Word-Guess-Game' }; // Pass data to the view (optional)
  }

  @Get('admin')
  @Render('admin') // Render the admin view (admin.hbs, admin.ejs, etc.)
  getAdminPage() {
    // Perform any necessary logic here
    return { title: 'Admin' }; // Pass data to the view (optional)
  }
}
