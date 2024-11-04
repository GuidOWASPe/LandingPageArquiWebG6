import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-camera-kit',
  templateUrl: './camera-kit.component.html',
  styleUrls: ['./camera-kit.component.css']
})
export class CameraKitComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCameraKit();
    }
  }

  async loadCameraKit() {
    const { bootstrapCameraKit } = await import('@snap/camera-kit');
    const cameraKit = await bootstrapCameraKit({
      apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzMwMjQ0NjM4LCJzdWIiOiIzMjgwMDMxNC04MzVmLTRhODAtOTY0Yy01YTUzNmQ2MjFhMGV-U1RBR0lOR343NTg2MDNiMS0wZThlLTRmMWEtOGRjMy05NWMyZWU4NTI3MWIifQ.gujBkXs_Kxy71DDwE_yK0TSK9Zuggdoe3QhjBilbEv0'
    });
    
    const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
    const session = await cameraKit.createSession({ liveRenderTarget });
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    await session.setSource(mediaStream);
    await session.play();

    const lens = await cameraKit.lensRepository.loadLens(
      'cc370eac-0a5d-45e8-96ce-257e1765d3a6',
      '22ce2c06-bb60-4153-90dc-9a163095c512'
    );

    await session.applyLens(lens);
  }
}
