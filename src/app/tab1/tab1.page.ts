import { Component } from '@angular/core';
import { IonButtons, IonSpinner, IonHeader, IonButton, IonToolbar, IonTitle, IonContent, IonLabel, IonItem, IonList, IonCard, IonInput, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { TaskI } from '../common/models/tasks.models';
import { FirestoreService } from '../common/services/firestore.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButtons,
    FormsModule,
    IonSpinner,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonCard,
    IonButton
  ],
})
export class Tab1Page {

  tasks: TaskI[] = [];
  newTask: TaskI;
  cargando: boolean = false;

  constructor(private firestoreService: FirestoreService) {
    this.loadTask();
    this.initTask();
  }

  loadTask(){
    this.firestoreService.getCollectionChanges<TaskI>('Tareas').subscribe(data => {
      if(data){
        this.tasks = data;
      }
    });
  }

  initTask(){
    this.newTask = {
      id: this.firestoreService.createdIdDoc(),
      titulo: null,
      descripcion: null,
      prioridad: null,
      responsable: null,
      fechaInicio: null,
      fechaFinal: null
    }
  }

  async save(){
    this.cargando = true;
    await this.firestoreService.createDocumentID(this.newTask, 'Tareas', this.newTask.id);
    this.cargando = false;
  }

  edit(task: TaskI){
    console.log('edit -> ', task);
    this.newTask = task;
  }

  async trash(task: TaskI){
    this.cargando = true;
    await this.firestoreService.deleteDocumentID('Tareas', task.id);
    this.cargando = false;
  }
}
