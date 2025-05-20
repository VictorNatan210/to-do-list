import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../_services/storage-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  error: boolean = false;
  labelContent: string = 'Qual tarefa adicionar?';
  submitBtnContent: string = 'Adicionar tarefa';
  resetBtnContent: string = 'Limpar';
  task: string = '';
  index: number = 0;

  constructor(private storage: StorageService) {
    const idx = this.storage.get('index');
    if (!idx) {
      this.storage.set('index', JSON.stringify(this.index));
    } else {
      this.index = JSON.parse(idx);
    }
  }

  addTask(): void {
    if (!this.task) {
      this.error = true;
      this.labelContent = 'Adicione alguma tarefa antes!';
      setTimeout(() => {
       this.error = false;
       this.labelContent = 'Qual tarefa adicionar?';
      }, 3000)
      return;
    }

    if (this.storage.taskExists(this.task)) {
      this.error = true;
      this.labelContent = 'Não adicione tarefas repetidas!';
      setTimeout(() => {
        this.error = false;
        this.labelContent = 'Qual tarefa adicionar?';
      }, 3000);
      return;
    }

    if (!this.storage.get('index')) {
      this.index = 0;
    }

    this.storage.set(`task_${this.index}`, this.task);
    this.index++;
    this.storage.set('index', JSON.stringify(this.index));

    this.submitBtnContent = 'Adicionado!';
    setTimeout(() => {
      this.submitBtnContent = 'Adicionar tarefa';
    }, 2000);
  }

  clearField(): void {
    this.resetBtnContent = "Limpo!";
    setTimeout(() => {
      this.resetBtnContent = "Limpar";
    }, 4000);
  }
}