import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers';
import { selectGameState } from '../../store/reducers/selectors';
import { Player } from '../../types';

const CARD_DEFAULT_WIDTH = 180;

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.scss'],
  host: { class: 'component-container' }
})
export class RevealComponent implements OnInit, AfterViewInit {

  // Data
  players: Player[];
  loading: boolean;

  // Carousel
  carouselIdx: number;
  transform: string;
  dragXPosition: number;
  xPosition: number;
  isDown: boolean;
  centerScreenX: number;
  xLimit: number;


  @ViewChild('cards') cardsRef: ElementRef<HTMLInputElement>;

  constructor(private router: Router,
              private store: Store<State>) {
    this.loading = true;

    // Carousel
    this.carouselIdx = 0;
    this.dragXPosition = 0;
    this.isDown = false;
    this.xPosition = 0;
    this.transform = `translateX(${CARD_DEFAULT_WIDTH}px)`;
  }

  ngOnInit(): void {
    this.store.select(selectGameState).subscribe(game => {
      if (!!game && !!game.players) {
        this.loading = false;
        this.players = game.players;
        this.xLimit = (this.players.length - 1) * CARD_DEFAULT_WIDTH;
      }
    });
  }

  ngAfterViewInit(): void {
    this.centerScreenX = window.innerWidth / 2;
  }

  carouselNext(): void {
    if (this.carouselIdx < this.players.length - 1) {
      this.carouselIdx++;
    }
  }

  carouselPrevious(): void {
    if (this.carouselIdx > 0) {
      this.carouselIdx--;
    }
  }

  goBack(): void {
    this.router.navigate(['roles']);
  }

  goNext(): void {
    this.router.navigate(['games']);
  }

  carouselClasses(idx: number): string {
    if (idx === this.carouselIdx - 1) {
      return 'previous';
    }

    if (idx === this.carouselIdx + 1) {
      return 'after';
    }

    if (idx === this.carouselIdx) {
      return 'selected';
    }

    return '';
  }

  onDragMoving(event): void {
    if (this.isDown) {

      this.xPosition = 0;
      if (this.dragXPosition - event.clientX > 0 && this.dragXPosition - event.clientX < this.xLimit) {
        this.xPosition = this.dragXPosition - event.clientX;
      } else if (this.dragXPosition - event.clientX >= this.xLimit) {
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
    this.dragXPosition = event.clientX + this.xPosition;
  }

  onDragEnd(event): void {
    if (this.isDown) {
      this.transform = `translateX(${CARD_DEFAULT_WIDTH - this.carouselIdx * CARD_DEFAULT_WIDTH}px)`;
    }
    this.isDown = false;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.centerScreenX = event.currentTarget.innerWidth / 2;
  }

}
