import { browser, by, element } from 'protractor';

export class LoginPage {
    private credentials ={
        'username':'testusername',
        'password':'testpassword',
        'shortPassword': 'test',
        'invalidEmail': 'test',
        'validEmail': 'test@test.com'
    }


  navigateTo() {
    return browser.get('/login');
  }

  getTitle() {
    return browser.getTitle();
  }

  fillLoginForm(credentials:any = this.credentials){
      element(by.id('email')).sendKeys(credentials.username)
      element(by.id('password')).sendKeys(credentials.password)
  }

  fillLoginEmail(credentials:any = this.credentials){
    element(by.id('email')).sendKeys(credentials.email)
  }

  clickEmailInput (){
      element(by.id('email')).click()
  }

  clickPasswordInput (){
      element(by.id('password')).click()
  }

  fillLoginPassword(credentials:any = this.credentials){
    element(by.id('password')).sendKeys(credentials.password)
  }

  getErrorText(){
    return element(by.css('.error-msg')).getText()
  }

  clickRememberMeButton (){
      element(by.className('remember-me item hydrated item-checkbox-checked')).click()
  }


 
}
