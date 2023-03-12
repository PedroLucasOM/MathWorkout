import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  menus = [
    {
      name: 'Adição'
    },
    {
      name: 'Subtração'
    },
    {
      name: 'Multiplicação'
    },
    {
      name: 'Divisão'
    },
    {
      name: 'Adição e Subtração'
    },
    {
      name: 'Multiplicação e Divisão'
    },
    {
      name: 'Misturado'
    }
  ]

  constructor(private router: Router) {}

  async navigateToAnswer(menuName: string) {
    const quiz = [];
    switch (menuName) {
      case 'Adição':
        for (let i = 0; i < 10; i++) {
          quiz.push(this.generate('+', i));
        }
        break;
      case 'Subtração':
        for (let i = 0; i < 10; i++) {
          quiz.push(this.generate('-', i));
        }
        break;
      case 'Multiplicação':
        for (let i = 0; i < 10; i++) {
          quiz.push(this.generate('*', i));
        }
        break;
      case 'Divisão':
        for (let i = 0; i < 10; i++) {
          quiz.push(this.generate('/', i, true));
        }
        break;
      case 'Adição e Subtração':
        for (let i = 0; i < 10; i++) {
          if (i % 2 == 0) {
            quiz.push(this.generate('+', i));
          } else {
            quiz.push(this.generate('-', i));
          }
        }
        break;
      case 'Multiplicação e Divisão':
        for (let i = 0; i < 10; i++) {
          if (i % 2 == 0) {
            quiz.push(this.generate('*', i));
          } else {
            quiz.push(this.generate('/', i, true));
          }
        }
        break;
      case 'Misturado':
        quiz.push(this.generate('+', 0));
        quiz.push(this.generate('-', 1));
        quiz.push(this.generate('*', 2));
        quiz.push(this.generate('/', 3, true));
        quiz.push(this.generate('+', 4));
        quiz.push(this.generate('-', 5));
        quiz.push(this.generate('*', 6));
        quiz.push(this.generate('/', 7, true));
        quiz.push(this.generate('*', 8));
        quiz.push(this.generate('/', 9, true));
        break;
    }
    await this.router.navigate(['/answer', {quiz: JSON.stringify(quiz)}]);
  }

  generate(operator: string, index: number, even?: boolean) {
    let number1 = Math.floor(Math.random() * 99) + 1;
    let number2 = Math.floor(Math.random() * 99) + 1;
    if (even) {
      while (number1 % 2 !== 0 || number2 % 2 !== 0  || (number1 % number2 !== 0)) {
        number1 = Math.floor(Math.random() * 99) + 1;
        number2 = Math.floor(Math.random() * 99) + 1;
      }
    }

    return {
      title: 'Questão ' + (index + 1),
      number1,
      number2,
      operator: operator == '*' ? 'x' : operator,
      result: eval(number1 + ' ' + operator + ' ' + number2)
    };
  }
}
