import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { selectGameState } from '../../store/reducers/selectors';
import { Player } from '../../types';
import { startAudioTurn } from '../../store/actions/actions';

const CARD_DEFAULT_WIDTH = 180;
const SMALL_CARD_DEFAULT_WIDTH = 60;

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss'],
  host: { class: 'component-container' }
})
export class RevealComponent implements OnInit {

  // Data
  players: Player[];
  loading: boolean;

  // Carousel
  carouselIdx: number;
  transform: string;
  reveal: boolean;
  /*  dragXPosition: number;*/
  /*  xPosition: number;*/
  /*  isDown: boolean;*/
  /*  centerScreenX: number;*/
  /*  xLimit: number;*/


  @ViewChild('cards') cardsRef: ElementRef<HTMLInputElement>;

  constructor(private router: Router,
              private store: Store<State>) {
    this.loading = true;
    this.reveal = false;

    // Carousel
    this.carouselIdx = 0;
    /*    this.dragXPosition = 0;*/
    /*    this.isDown = false;*/
    /*    this.xPosition = 0;*/

  }

  ngOnInit(): void {
    this.transform = `translateX(${this.getWindowSize()}px)`;

    this.store.select(selectGameState).subscribe(game => {
      if (!!game && !!game.players) {
        this.loading = false;
        this.players = game.players;
        /*        this.xLimit = (this.players.length - 1) * this.getWindowSize();*/
      }
    });
  }

  /*  ngAfterViewInit(): void {
      this.centerScreenX = window.innerWidth / 2;
    }*/

  carouselNext(): void {
    if (this.carouselIdx < this.players.length - 1) {
      this.carouselIdx++;
      this.transform = `translateX(${this.getWindowSize() - this.carouselIdx * this.getWindowSize()}px)`;
      this.reveal = false;
    }
  }

  carouselPrevious(): void {
    if (this.carouselIdx > 0) {
      this.carouselIdx--;
      this.transform = `translateX(${this.getWindowSize() - this.carouselIdx * this.getWindowSize()}px)`;
      this.reveal = false;
    }
  }

  goBack(): void {
    this.router.navigate(['roles']);
  }

  goNext(): void {
    this.store.dispatch(startAudioTurn());
  }


  selectPlayer(idx: number) {
    this.carouselIdx = idx;
    this.transform = `translateX(${this.getWindowSize() - this.carouselIdx * this.getWindowSize()}px)`;
    this.reveal = false;
  }

  getPlayerAvatarImg(index: number): string {
    if (!!this.players && this.players.length && !!this.players[index]) {
      return `/assets/avatars/${this.players[index].avatar_index}.png`;
    }
  }

  onReveal() {
    this.reveal = !this.reveal;
    if (!this.reveal) {
      this.carouselNext();
    }
  }

  // Classes

  iconClasses(idx: number, team: string): string {
    if (idx !== this.carouselIdx || !this.reveal) {
      return '';
    }
    return team === 'blue' ? ' blue-team-icon' : ' red-team-icon';
  }

  carouselClasses(idx: number): string {
    if (idx < this.carouselIdx) {
      return 'previous';
    }

    if (idx > this.carouselIdx) {
      return 'next';
    }

    if (idx === this.carouselIdx) {
      return 'selected';
    }

    return '';
  }

  revealClasses(idx: number): string {
    if (this.reveal && idx === this.carouselIdx) {
      return ' reveal';
    }
    return '';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.selectPlayer(this.carouselIdx);
  }

  getWindowSize() {
    return window.innerWidth > 800 ? CARD_DEFAULT_WIDTH : SMALL_CARD_DEFAULT_WIDTH;
  }

  /*  onDragMoving(event): void {
      if (this.isDown) {
        console.log('onDragMoving')

        this.xPosition = 0;
        if (this.dragXPosition - event.clientX > 0 && this.dragXPosition - event.clientX < this.xLimit) {
          this.xPosition = this.dragXPosition - event.clientX;
          console.log('paslimit', this.dragXPosition - event.clientX, this.dragXPosition, event.clientX);
        } else if (this.dragXPosition - event.clientX >= this.xLimit) {
          console.log('limit', this.dragXPosition - event.clientX);
          this.xPosition = this.xLimit;
        }


        this.transform = `translateX(${CARD_DEFAULT_WIDTH - this.xPosition}px)`;
        let index = 0;
        for (const child of this.cardsRef.nativeElement.children as any) {
          if (child.getBoundingClientRect().left < this.centerScreenX &&
            (child.getBoundingClientRect().left + child.offsetWidth) > this.centerScreenX) {
            this.carouselIdx = index;
          }
          index++;
        }
      }
    }

    onDragStart(event): void {
      this.isDown = true;
      console.log('onDragStart');
      this.dragXPosition = event.clientX + this.xPosition;
    }

    onDragEnd(event): void {
      console.log('onDragEnd');
      if (this.isDown) {
        console.log('onDragEndisDown');
        // this.dragXPosition = CARD_DEFAULT_WIDTH - this.carouselIdx * CARD_DEFAULT_WIDTH;
        this.transform = `translateX(${CARD_DEFAULT_WIDTH - this.carouselIdx * CARD_DEFAULT_WIDTH}px)`;
      }
      this.isDown = false;
    }*/

  /*  @HostListener('window:resize', ['$event'])
    private onResize(event) {
      this.centerScreenX = event.currentTarget.innerWidth / 2;
    }*/

}
