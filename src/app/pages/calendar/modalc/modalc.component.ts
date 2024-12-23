import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MyCalendar} from "../../../interfaces/Calendar";
import {FormBuilder, Validators} from "@angular/forms";
import {CalendarDTO} from "../../../interfaces/CalendarDTO";

@Component({
  selector: 'app-modalc',
  templateUrl: './modalc.component.html',
  styleUrls: ['./modalc.component.scss']
})
export class ModalcComponent {
  selectedCalendar!: number
  @Output() closeEdit = new EventEmitter<CalendarDTO[]>();
  @Input() calendar?: CalendarDTO[]
  form = this.fb.group({
    id: [NaN],
    title: ['', [Validators.required]],
  })
  form2 = this.fb.group({
    id:  [NaN],
    title: ['', [Validators.required]],
  })
  selectCalendar?: CalendarDTO;
  mesILUHI=""
  mesnotILUHI=""

  constructor(private fb: FormBuilder) {
  }
  close() {
    this.closeEdit.emit(this.calendar);
  }
  ngOnInit() {
    this.selectedCalendar = this.calendar![0].id;
    this.emitSelected()
  }
  noStore(): boolean {
    return ((!this.calendar?.length))
  }
  emitSelected() {
    this.selectCalendar = this.calendar?.find(st => st.id == this.selectedCalendar);
    this.form2.setValue({
      id: this.selectCalendar!.id,
      title: this.selectCalendar!.title,
    })
  }
  addCalendar(){
    this.
    close()
  }

  addStore() {
    let bs = this.form.getRawValue() as MyCalendar

    if (this.form.controls.title.invalid) {
      this.mesnotILUHI = "Введите название корректно"
      return;
    }
    {
      // this.bSservice.addBookstore(bs).subscribe({
      //   next: bookstore => {
      //     this.bookstors?.push(bookstore);
      //     console.log(bookstore);
      //
      //     this.form.reset();
      //     this.mesnotILUHI = "";
      //   },
      //   error: e => {
      //   }
      // });
    }
  }
  updateStore() {
    let bs = this.form2.getRawValue() as MyCalendar
    console.log(this.form2);

    if (this.form2.controls.title.invalid) {
      this.mesILUHI = "Введите название корректно"
      return;
    }
    // this.bSservice.updateBookstore(bs).subscribe({
    //   next: bookstore => {
    //     this.bookstors = this.bookstors!.map(x => x.id === bookstore.id ? bookstore : x);
    //     this.mesILUHI="";
    //   },
    //   error: e => {
    //   }
    // });

  }
  confirm() {
  }
}
