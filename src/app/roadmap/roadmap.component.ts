import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {productRequest} from "../product-request";
import {ProductRequestService} from "../product-request.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {
  planned: productRequest[] = [];
  inProgress: productRequest[] = [];
  live: productRequest[] = [];
  category: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private requestService: ProductRequestService) {
  }

  ngOnInit(): void {
    this.requestService.getAllProductRequests().subscribe(requests => {
      this.planned = requests.filter(request => request.status === 'planned');
      this.inProgress = requests.filter(request => request.status === 'in-progress');
      this.live = requests.filter(request => request.status === 'live');
    });

    this.category = this.requestService.selectedCategory$;
  }

  drop(event: CdkDragDrop<productRequest[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const item = event.container.data[event.currentIndex];
      this.requestService.updateProductRequestStatus(item.id, event.container.id);
    }
  }
}
