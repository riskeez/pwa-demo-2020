import { Component, OnInit } from '@angular/core';
import { StorageQuota } from './storage-quota.model';

const ONE_MEG = 1000000;

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  storageInfo: StorageQuota | null = null;
  constructor() { }

  ngOnInit(): void {
    this.updateQuota();
  }

  updateQuota() {
    navigator.storage.estimate().then((quota: StorageEstimate) => {
      const total = this.formatToMB(quota.quota);
      const used = this.formatToMB(quota.usage);

      this.storageInfo = new StorageQuota(total, used);
    }).catch((_) => {
      this.storageInfo = null;
    }).then(() => {
      setTimeout(() => {
        this.updateQuota();
      }, 500);
    });
  }

  formatToMB(val: number | undefined) {
    if (val) {
      return Math.round(val / ONE_MEG);
    }
    return 0;
  }
}
