import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');                                                           // Зашла на сайт
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');                          // Есть крестик и он виден пользователю
    });           

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type('german@dolnikov.ru');                      // Ввела верный логин
         cy.get(main_page.password).type('iLoveqastudio1');                       // Ввела верный пароль
         cy.get(main_page.login_button).click();                                  // Нажала на кнопку войти
         cy.get(result_page.title).contains('Авторизация прошла успешно');        // Проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible');                          // Текст виден пользователю
     })

     it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();                                 // Нажала забыли пароль?
        cy.get(recovery_password_page.email).type('german@dolnikov.ru');          // Ввела E-mail
        cy.get(recovery_password_page.send_button).click();                       // Нажала отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю на совп. текст
    })
 
       it('Верный логин и НЕверный пароль', function () {
         cy.get(main_page.email).type('german@dolnikov.ru');                      // Ввела верный логин
         cy.get(main_page.password).type('iLoveqastudio5');                       // Ввела НЕверный пароль
         cy.get(main_page.login_button).click();                                  // Нажала на кнопку войти
         cy.get(result_page.title).contains('Такого логина или пароля нет');      // Проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible');                          // Текст виден пользователю      
     })

     it('НЕверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolniko.ru');                        // Ввела НЕверный логин
        cy.get(main_page.password).type(data.password);                           // Ввела верный пароль
        cy.get(main_page.login_button).click();                                   // Нажала на кнопку войти
        cy.get(result_page.title).contains('Такого логина или пароля нет');       // Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible');                           // Текст виден пользователю      
    })
 
       it('Проверка, что в логине есть @', function () {
         cy.get(main_page.email).type('germandolnikov.ru');                       // Ввела логин без @
         cy.get(main_page.password).type(data.password);                          // Ввела верный пароль
         cy.get(main_page.login_button).click();                                  // Нажала на кнопку войти
         cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible');                           // Текст виден пользователю
     })

     it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');                       // Ввела логин с заглавными буквами
        cy.get(main_page.password).type(data.password);                           // Ввела верный пароль
        cy.get(main_page.login_button).click();                                   // Нажала на кнопку войти
        cy.get(result_page.title).contains('Авторизация прошла успешно');         // Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible');                           // Текст виден пользователю
    })     
 
   })
 