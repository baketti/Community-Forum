import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { SpinnerComponent } from '@/app/shared/components/spinner/spinner.component';

interface SpinnerState {
  count: number;
}

interface LoadingState {
  spinnerId: string;  
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private spinners: Map<string, SpinnerState> = new Map();
  public currentSpinnerId: string | null = null;
  private loading = new BehaviorSubject<LoadingState>({
    spinnerId: '',
    show: false
  });
  public readonly isAjaxLoading$ = this.loading.asObservable().pipe(
    map(state => state.show)
  );
  private overlayRef = this.cdkOverlayCreate();

  constructor(private overlay: Overlay) {}
  
  private cdkOverlayCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .bottom()
        .right(),
    });
  }

  private getOrCreateSpinner(id: string): SpinnerState|undefined {
    if (!this.spinners.has(id)) {
      this.spinners.set(id, { count: 0 });
    }
    return this.spinners.get(id);
  }

  public addQuene(id: string) {
    const spinner = this.getOrCreateSpinner(id);    
    if (spinner) {
      spinner.count++;
      if (!this.currentSpinnerId) {
        this.showSpinner(id);
      }
    }
  }

  public removeQuene(id: string) {
    const spinner = this.spinners.get(id);
    if (spinner && spinner.count > 0) {
      spinner.count--;
      if (spinner.count < 1 && this.currentSpinnerId === id) {
        this.stopSpinner(id);
      }
    }
  }

  private showSpinner(id: string) {
    this.currentSpinnerId = id;
    this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
    this.loading.next({
      spinnerId: id,
      show: true  
    });
  }

  private stopSpinner(id: string) {
    this.overlayRef.detach();
    if (this.currentSpinnerId === id) {
      const anyActive = Array.from(this.spinners.values()).some(s => s.count > 0);
      if (!anyActive) {
        this.loading.next({
          spinnerId: id,
          show: false
        });
        this.currentSpinnerId = null;
      }
    }
  }
}
