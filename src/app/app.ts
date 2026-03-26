import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container py-4">

      <div class="d-flex gap-2 mb-3">
        <button class="btn btn-outline-secondary btn-sm" (click)="showAll()">All Cards</button>
        <button class="btn btn-outline-secondary btn-sm" (click)="showFew()">Few Cards</button>
        <button class="btn btn-outline-secondary btn-sm" (click)="showNone()">No Cards</button>
      </div>

      <div class="card border rounded-3 shadow-sm" style="overflow: hidden;">
        <h4 class="mb-3 ps-3 pt-3 fw-normal">I Want To...</h4>

        @if (items.length > 0) {
          <div class="position-relative">

            @if (showNav) {
              <button
                class="swiper-btn-prev d-none d-lg-flex position-absolute align-items-center justify-content-center"
                aria-label="Previous"
                (mouseenter)="prevHovered = true"
                (mouseleave)="prevHovered = false"
                (click)="slidePrev()"
                [style.box-shadow]="prevHovered ? '0 .5rem 1rem rgba(0,0,0,.15)' : 'var(--elevation-sm, 0 1px 3px rgba(0,0,0,.1))'"
                [style.transform]="prevHovered ? 'translateY(calc(-50% - 2px))' : 'translateY(-50%)'"
              >
                <span class="material-icons">chevron_left</span>
              </button>

              <button
                class="swiper-btn-next d-none d-lg-flex position-absolute align-items-center justify-content-center"
                aria-label="Next"
                (mouseenter)="nextHovered = true"
                (mouseleave)="nextHovered = false"
                (click)="slideNext()"
                [style.box-shadow]="nextHovered ? '0 .5rem 1rem rgba(0,0,0,.15)' : 'var(--elevation-sm, 0 1px 3px rgba(0,0,0,.1))'"
                [style.transform]="nextHovered ? 'translateY(calc(-50% - 2px))' : 'translateY(-50%)'"
              >
                <span class="material-icons">chevron_right</span>
              </button>
            }

            <swiper-container #swiperEl init="false" [style.padding-bottom]="showNav ? '0px' : '16px'">
              @for (item of items; track item.label) {
                <swiper-slide
                  style="height: auto !important;"
                  (keydown.enter)="onItemClick(item)"
                  (keydown.space)="onItemClick(item)"
                >
                  <div
                    role="button"
                    class="i-want-card d-flex flex-column align-items-center justify-content-center gap-3 rounded-3 w-100 h-100 border-0"
                    (click)="onItemClick(item)"
                  >
                    <i class="material-icons">{{ item.icon }}</i>
                    <span class="text-center text-dark">{{ item.label }}</span>
                  </div>
                </swiper-slide>
              }
            </swiper-container>

          </div>
        } @else {
          <div class="d-flex justify-content-center align-items-center py-4">
            <p class="text-muted mb-0">Nothing to Do Here</p>
          </div>
        }

      </div>
    </div>
  `,
  styles: [`

    swiper-container {
      width: 100%;
      padding-top: 2px;
      padding-left: 23px;
      padding-right: 23px;
    }

    swiper-container.is-dragging {
      cursor: grabbing !important;
    }

    .i-want-card {
      padding: 12px 16px;
      transition: box-shadow 0.2s, transform 0.2s;
      background: #fff;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
      border: 1px solid #dee2e6 !important;
      outline: none;
    }

    .i-want-card:hover {
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
      transform: translateY(-2px);
    }

    .i-want-card:focus-visible {
      outline: 2px solid #157db9;
    }

    .i-want-card i {
      color: #CED4DA !important;
      font-size: 48px !important;
    }

    swiper-container:focus,
    swiper-slide:focus {
      outline: none !important;
    }

    swiper-slide:focus .i-want-card {
      outline: 2px solid #157db9;
      box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
      transform: translateY(-2px);
    }

    .i-want-card:focus,
    .i-want-card:focus-visible {
      outline: none;
    }

    .swiper-btn-prev,
    .swiper-btn-next {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      top: calc(50% - 18px);
      z-index: 10;
      background-color: var(--card, #fff);
      border: 1px solid var(--border, #dee2e6);
      cursor: pointer;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      padding: 0;
    }

    .swiper-btn-prev:focus,
    .swiper-btn-next:focus {
      outline: none;
    }

    .swiper-btn-prev:focus-visible,
    .swiper-btn-next:focus-visible {
      outline: 2px solid #157db9;
    }

    .swiper-btn-prev { left: 8px; }
    .swiper-btn-next { right: 8px; }

    .swiper-btn-prev .material-icons,
    .swiper-btn-next .material-icons {
      font-size: 28px;
      color: var(--foreground, #333);
    }

  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperEl') swiperRef!: ElementRef;

  prevHovered = false;
  nextHovered = false;
  swiperInitialized = false;

  items: { label: string; icon: string }[] = [];
  constructor(private cdr: ChangeDetectorRef) { }

  private allItems = [
    { label: 'Order Line/Device', icon: 'devices' },
    { label: 'Upgrade Device', icon: 'install_mobile' },
    { label: 'Manage Lines', icon: 'signal_cellular_alt' },
    { label: 'Travel', icon: 'flight' },
    { label: 'Transfer Liability', icon: 'swap_horiz' },
    { label: 'Bulk Order', icon: 'inventory_2' },
    { label: 'Action 1', icon: 'settings' },
    { label: 'Action 2', icon: 'support' },
    { label: 'Action 3', icon: 'analytics' },
    { label: 'Action 4', icon: 'security' },
    { label: 'Action 5', icon: 'payments' },
    { label: 'Action 6', icon: 'notifications_active' },
    { label: 'Action 7', icon: 'cloud_upload' }
  ];

  ngOnInit() {
    this.items = [...this.allItems];
  }

  showAll() {
    this.items = [];
    this.swiperInitialized = false;
    this.cdr.detectChanges();
    this.items = [...this.allItems];
    this.cdr.detectChanges();
    setTimeout(() => this.initSwiper());
  }

  showFew() {
    this.items = [];
    this.swiperInitialized = false;
    this.cdr.detectChanges();
    this.items = this.allItems.slice(0, 3);
    this.cdr.detectChanges();
    setTimeout(() => this.initSwiper());
  }

  showNone() {
    this.items = [];
    this.swiperInitialized = false;
  }

  get showNav(): boolean {
    return this.items.length > this.getCurrentSlidesPerGroup();
  }

  getCurrentSlidesPerGroup(): number {
    const w = window.innerWidth;
    if (w >= 1200) return 6;
    if (w >= 992) return 5;
    if (w >= 768) return 4;
    if (w >= 576) return 3;
    return 2;
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    if (this.swiperInitialized) return;
    if (!this.swiperRef?.nativeElement) return;

    const swiperEl = this.swiperRef.nativeElement;
    this.swiperInitialized = true;

    const hasMultiplePages = this.items.length > this.getCurrentSlidesPerGroup();

    Object.assign(swiperEl, {
      slidesPerView: 6,
      slidesPerGroup: 6,
      loop: true,
      watchOverflow: true,
      longSwipesRatio: 0.1,
      navigation: false,
      pagination: { clickable: true },
      spaceBetween: 24,
      grabCursor: true,
      autoHeight: false,
      injectStyles: [
        `
        :host .swiper,
        :host .swiper-wrapper {
          cursor: grab !important;
        }

        :host(.is-dragging) .swiper,
        :host(.is-dragging) .swiper-wrapper,
        :host(.is-dragging) .swiper-slide,
        :host(.is-dragging) .swiper-slide * {
          cursor: grabbing !important;
        }

        :host .swiper-wrapper {
          display: flex !important;
          align-items: stretch !important;
          ${!hasMultiplePages ? 'height: 100% !important;' : ''}
        }

        :host .swiper-slide {
          display: flex !important;
          flex-direction: column !important;
          height: auto !important;
        }

        :host .swiper {
          padding: 2px 0;
          overflow: visible !important;
        }

        :host .swiper-pagination {
          position: relative !important;
          margin-top: 16px;
          margin-bottom: 0px;
        }

        :host .swiper-pagination-lock {
          display: none !important;
        }

        :host .swiper-pagination-bullet {
          width: 32px;
          height: 8px;
          background: #ced4da;
          opacity: 1;
          border-radius: 9999px;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background-color 0.2s ease;
          margin: 0;
        }

        :host .swiper-pagination-bullet:focus {
          outline: 2px solid #157db9 !important;
        }

        :host .swiper-pagination-bullet-active {
          background: #157db9;
          width: 32px;
          height: 8px;
          border-radius: 9999px;
        }
        `
      ],
      breakpoints: {
        0: { slidesPerView: 2, slidesPerGroup: 2 },
        576: { slidesPerView: 3, slidesPerGroup: 3 },
        768: { slidesPerView: 4, slidesPerGroup: 4 },
        992: { slidesPerView: 5, slidesPerGroup: 5 },
        1200: { slidesPerView: 6, slidesPerGroup: 6 },
      }
    });

    swiperEl.initialize();

    swiperEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') this.swiperRef.nativeElement.swiper.slideNext();
      if (e.key === 'ArrowLeft') this.swiperRef.nativeElement.swiper.slidePrev();
    });

    swiperEl.swiper.on('touchStart', () => swiperEl.classList.add('is-dragging'));
    swiperEl.swiper.on('touchEnd', () => swiperEl.classList.remove('is-dragging'));
  }

  onItemClick(item: { label: string; icon: string }) {
    console.log('Clicked:', item.label);
    alert(item.label);
  }

  slidePrev() {
    this.swiperRef.nativeElement.swiper.slidePrev();
  }

  slideNext() {
    this.swiperRef.nativeElement.swiper.slideNext();
  }
}