import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  name: string;
  score: number;
  // frequency: number;
  icon: string;
  icones = [
    { 'name': 'fas fa-star' },
    { 'name': 'fas fa-prescription-bottle-alt' },
    { 'name': 'fas fa-piggy-bank' },
    { 'name': 'fas fa-bed' },
    { 'name': 'fas fa-cart-plus' },
    { 'name': 'fas fa-gas-pump' },
    { 'name': 'fas fa-car' },
    { 'name': 'fas fa-broom' },
    { 'name': 'fas fa-quidditch' },
    { 'name': 'fas fa-fill-drip' },
    { 'name': 'fas fa-layer-group' },
    { 'name': 'fas fa-poo' },
    { 'name': 'fas fa-paw' },
    { 'name': 'fas fa-coffee' },
    { 'name': 'fas fa-seedling' },
    { 'name': 'fab fa-pagelines' },
    { 'name': 'far fa-trash-alt' },
    { 'name': 'fas fa-recycle' },
    { 'name': 'fas fa-utensils' },
    { 'name': 'fas fa-tshirt' },
    { 'name': 'fas fa-socks' },
    { 'name': 'fab fa-black-tie' },
    { 'name': 'fas fa-shower' },
    { 'name': 'fas fa-couch' },
    { 'name': 'fas fa-tooth' },
    { 'name': 'fas fa-suitcase' },
    { 'name': 'fas fa-gamepad' },
    { 'name': 'fas fa-heartbeat' },
    { 'name': 'fas fa-bicycle' },
    { 'name': 'fas fa-mortar-pestle' },
    { 'name': 'fab fa-palfed' },
    { 'name': 'fas fa-child' },
    { 'name': 'fas fa-pencil-ruler' },
    { 'name': 'fas fa-door-closed' },
    { 'name': 'fas fa-lock' },
    { 'name': 'fas fa-door-open' },
    { 'name': 'fas fa-lock-open' },
    { 'name': 'fas fa-screwdriver' },
    { 'name': 'fas fa-book' },
    { 'name': 'fas fa-shoe-prints' },
    { 'name': 'fab fa-keybase' },
    { 'name': 'fas fa-people-carry' },
    { 'name': 'fas fa-pray' },
    { 'name': 'fas fa-procedures' },
    { 'name': 'fas fa-shapes' },
    { 'name': 'far fa-sticky-note' },
    { 'name': 'fas fa-shopping-bag' }
  ];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    let init = new Object;
    init = { 'target': { 'value': 1 } };
    this.scoreChange(init);
    // this.frequencyChange(init);
    this.icon = this.icones[0].name;
  }

  nameChange($value) {
    this.name = $value.target.value;
  }

  scoreChange($value) {
    this.score = $value.target.value;
    if (this.score <= 1) {
      document.getElementById('score-span').innerHTML = ' ' + this.score + ' Ponto';
    } else {
      document.getElementById('score-span').innerHTML = ' ' + this.score + ' Pontos';
    }
  }

  // frequencyChange($value) {
  //   switch (Number($value.target.value)) {
  //     case 1:
  //     this.frequency = 0;
  //     document.getElementById('frequency-span').innerHTML = ' Sem frequência determinada';
  //     break;

  //     case 2:
  //     this.frequency = 21600;
  //     document.getElementById('frequency-span').innerHTML = ' 4 vezes/dia';
  //     break;

  //     case 3:
  //     this.frequency = 28800;
  //     document.getElementById('frequency-span').innerHTML = ' 3 vezes/dia';
  //     break;

  //     case 4:
  //       this.frequency = 43200;
  //       document.getElementById('frequency-span').innerHTML = ' 2 vezes/dia';
  //       break;

  //     case 5:
  //       this.frequency = 86400;
  //       document.getElementById('frequency-span').innerHTML = ' 1 vez/dia';
  //       break;

  //     case 6:
  //       this.frequency = 259200;
  //       document.getElementById('frequency-span').innerHTML = ' 1 vez/3 dias';
  //       break;

  //     case 7:
  //       this.frequency = 432000;
  //       document.getElementById('frequency-span').innerHTML = ' 1 vez/5 dias';
  //       break;

  //     case 8:
  //       this.frequency = 604800;
  //       document.getElementById('frequency-span').innerHTML = ' 1 vez/Semana';
  //       break;

  //     case 9:
  //       this.frequency = 1296000;
  //       document.getElementById('frequency-span').innerHTML = ' 1 vez/2 Semanas';
  //       break;

  //     case 10:
  //       this.frequency = 2592000;
  //       document.getElementById('frequency-span').innerHTML = ' 1 vez/mês';
  //       break;

  //     default:
  //       this.frequency = 0;
  //       document.getElementById('frequency-span').innerHTML = ' Sem frequência determinada';
  //       break;
  //   }
  // }

  onSubmit(event) {
    event.preventDefault();
    let form = new Object;
    form = { 'name' : this.name, 'score' : this.score, 'icon' : this.icon };

    this.auth.setTask(JSON.stringify(form)).subscribe(
      (resp) => {
        console.log('Tarefa cadastrada');
        // this.name = null;

        // if (this.auth.checkTasks() !== null) {
        //   this.auth.getTasks();
        // }
        // if (this.auth.getFamily().id === 1) {
        //   this.router.navigate(['loginfamily']);
        // } else {
        //   if (this.auth.getFamily().admin === this.auth.getUser().id) {
        //     this.router.navigate(['sadmin']);
        //   } else {
        //     this.router.navigate(['nadmin']);
        //   }
        // }
      }
    );
  }

  selectIcon(icon) {
    console.log(icon);
  }
}
