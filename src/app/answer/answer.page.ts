import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {

  quiz = [];
  score: string[] = [];
  current = {
    title: undefined,
    number1: undefined,
    number2: undefined,
    operator: undefined,
    result: undefined
  };
  currentIndex = 0;

  selectedNumbers = '';

  scoreTotal = 0;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.quiz = JSON.parse(<string>this.route.snapshot.paramMap.get('quiz'));
    this.current = this.quiz[0];
    this.currentIndex = 0;
    this.scoreTotal = 0;
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  async confirm() {
    if (!!this.selectedNumbers) {

      if (this.selectedNumbers == this.current.result) {
        this.scoreTotal += 1;
        this.score.push('correct');
      } else {
        this.score.push('wrong');
      }

      if (this.currentIndex < this.quiz.length) {
        this.current = this.quiz[this.currentIndex + 1];
        this.currentIndex += 1;
        this.selectedNumbers = '';
      }

    }
  }

  clear() {
    this.selectedNumbers = '';
  }

  addNumber(number: number) {
    if (this.selectedNumbers.length < 15) {
      this.selectedNumbers += number;
    }
  }
}
