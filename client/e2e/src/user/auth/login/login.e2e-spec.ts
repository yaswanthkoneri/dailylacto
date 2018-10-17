import { LoginPage } from './login.po';

describe('Daily Lacto - Login page', () => {
  let page: LoginPage;

  const wrongCredentials = {
    username: 'wrongname',
    password: 'wrongpasswd',
    shortPassword :'test',
    invalidEmail: 'test',
    validEmail: 'test@test.com',
    email:'testname'
  };

  const rightCredentials = {
      username: 'test@test.com',
      password: 'test123',
      email: 'test@test.com'
  }

  beforeEach(() => {
    page = new LoginPage();
  });

  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  it('Should fail with empty Email Id & throw invalid email error', async ()=> {
      await page.navigateTo()
      await page.clickEmailInput()
      await timeout(2000)
      await page.clickPasswordInput()
      await timeout(2000)
    //   await page.fillLoginEmail(wrongCredentials)
      await expect(page.getErrorText()).toEqual('Please provide your email');
   
  });

  it('Should fail with wrong Email Id', async ()=> {
    await page.navigateTo()
    await page.fillLoginEmail(wrongCredentials)
    await timeout(1000)
    await page.clickPasswordInput()
    await timeout(1000)
    await expect(page.getErrorText()).toEqual('Please provide the correct email address');
    await timeout(1000)
  });

  it('Should fail with empty Password', async ()=> {
    await page.navigateTo()
    await page.fillLoginEmail(rightCredentials)
    await timeout(1000)
    await page.clickPasswordInput()
    await timeout(1000)
    await page.clickRememberMeButton()
    await timeout(2000)
    await expect(page.getErrorText()).toEqual('We need your password: We won’t tell anyone. Promise.');
  });

  it('Should have Menu Text Home', async ()=> {
    await page.navigateTo()
    await page.getTitle()
    await timeout(1000)
  });

});