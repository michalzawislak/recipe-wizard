import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamUtil, WebcamModule } from 'ngx-webcam';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRow, IonCol, IonGrid, IonCard } from '@ionic/angular/standalone';
import { PhotoService } from '../../services/photo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-photo-capture',
  templateUrl: './photo-capture.component.html',
  styleUrls: ['./photo-capture.component.scss'],
  standalone: true,
  imports: [IonCard, IonGrid, IonCol, IonRow, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, WebcamModule],
})
export class PhotoCaptureComponent {
  @Output() ingredientsFromImage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private photoService: PhotoService, private loadingCtrl: LoadingController) {}

  private trigger: Subject<void> = new Subject<void>();

  public webcamImage: WebcamImage | undefined = undefined;

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public async handleImage(webcamImage: WebcamImage): Promise<void> {
    this.webcamImage = webcamImage;
    const loading = await this.loadingCtrl.create({
      message: 'Rozpoznawanie składników...'
    });
    loading.present();
    this.photoService.uploadPhoto(`data:image/jpeg;base64,${webcamImage.imageAsBase64}`).subscribe((response: any) => {
      if(response) {
        loading.dismiss();
        this.ingredientsFromImage.emit(`${response.ingredients}`);
      }
    });
  }
  
  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
