import { Component, OnInit } from '@angular/core';
import {
  EmployeesLimits,
  GlobalLimits,
  UserLimits,
  SetEmployeeLimits,
  SetGlobalLimitRequestModel
} from '../../app.const';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {SettingsService} from '../../settings.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  globalLimit: GlobalLimits;

  userLimits: UserLimits;

  employeesLimits: EmployeesLimits[] = [];

  showMyLimitsEditBtns = false;
  showGlobalLimitsEditBtns = false;
  showEmployeeLimitsEditBtns = false;
  hideEmployeeLimitEditBtn = false;
  myLimitsForm = new FormGroup({
    myYearlyLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]),
    myMonthlyLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
    myRowLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
  });
  globalLimitsForm = new FormGroup({
    globalYearlyLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]),
    globalMonthlyLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
    globalRowLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
  });
  allEmployeesLimitsForm = new FormGroup({
    allEmployeesYearlyLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]),
    allEmployeesMonthlyLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
    allEmployeesRowLimit: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
  });

  employeesLimitsFormArray = new FormArray([]);
  setGlobalLimit: SetGlobalLimitRequestModel;
  employeeLimit: SetEmployeeLimits;
  allEmployeesLimits: SetGlobalLimitRequestModel;
  constructor(private settingsService: SettingsService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getGlobalLimits();
    this.getUserLimits();
    this.getEmployyesLimits();
  }

  getUserLimits() {
    this.settingsService.getUserLimits().subscribe(
      resp => {
        this.userLimits = resp;
        this.myLimitsForm = new FormGroup({
          myYearlyLimit: new FormControl(this.userLimits.yearLimit, [Validators.required, Validators.min(0), Validators.max(30)]),
          myMonthlyLimit: new FormControl(this.userLimits.monthLimit, [Validators.required, Validators.min(0), Validators.max(10)]),
          myRowLimit: new FormControl(this.userLimits.rowLimit, [Validators.required, Validators.min(0), Validators.max(5)]),
        });
        this.myLimitsForm.disable();
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

  getEmployyesLimits() {
    this.settingsService.getEmployeesLimits().subscribe(
      resp => {
        this.employeesLimits = resp;
        for (const v in this.employeesLimits) {
          this.addEmployee(this.employeesLimits[v]);
        }
        this.employeesLimitsFormArray.disable();
        this.spinner.hide();
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

  addEmployee(limit: EmployeesLimits): void {
    const employeeLimitsFormGroup = new FormGroup({
      employeeId: new FormControl(limit.employeeId),
      employeeName: new FormControl(limit.employeeName),
      limitId: new FormControl(limit.limitId),
      employeeYearlyLimit: new FormControl(limit.yearLimit, [Validators.required, Validators.min(0), Validators.max(30)]),
      employeeMonthlyLimit: new FormControl(limit.monthLimit, [Validators.required, Validators.min(0), Validators.max(10)]),
      employeeRowLimit: new FormControl(limit.rowLimit, [Validators.required, Validators.min(0), Validators.max(5)]),
    });

    this.employeesLimitsFormArray.push(employeeLimitsFormGroup);
  }

  getGlobalLimits() {
    this.settingsService.getGlobalLimits().subscribe(
      resp => {
        this.globalLimit = resp;
        this.globalLimitsForm = new FormGroup({
          globalYearlyLimit: new FormControl(this.globalLimit.yearLimit, [Validators.required, Validators.min(0), Validators.max(30)]),
          globalMonthlyLimit: new FormControl(this.globalLimit.monthLimit, [Validators.required, Validators.min(0), Validators.max(10)]),
          globalRowLimit: new FormControl(this.globalLimit.rowLimit, [Validators.required, Validators.min(0), Validators.max(5)]),
        });
        this.globalLimitsForm.disable();
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

  enableMyLimitsForm(): void {
    this.myLimitsForm.enable();
    document.getElementById('edit-my-limits').classList.add('hide');
    this.showMyLimitsEditBtns = !this.showMyLimitsEditBtns;
  }

  enableGlobalLimitsForm(): void {
    this.globalLimitsForm.enable();
    document.getElementById('edit-global-limits').classList.add('hide');
    this.showGlobalLimitsEditBtns = !this.showGlobalLimitsEditBtns;
  }

  enableEmployeeLimitsForm(): void {
    this.hideEmployeeLimitEditBtn = !this.hideEmployeeLimitEditBtn;
    this.employeesLimitsFormArray.enable();
    this.showEmployeeLimitsEditBtns = !this.showEmployeeLimitsEditBtns;
  }

  openSnackBar(): void {
    this.snackBar.open('Limits saved!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar-background']
    });
  }

  saveAllEmployeesLimits(): void {
    this.allEmployeesLimits = {
      yearLimit: this.allEmployeesLimitsForm.get('allEmployeesYearlyLimit').value,
      monthLimit: this.allEmployeesLimitsForm.get('allEmployeesMonthlyLimit').value,
      rowLimit: this.allEmployeesLimitsForm.get('allEmployeesRowLimit').value
    };
    this.settingsService
      .changeAllEmployeesLimits(this.allEmployeesLimits)
      .subscribe(employeeLimit => { this.spinner.show();
        this.employeesLimitsFormArray.clear();
        for (const index in this.employeesLimits) {
        this.employeesLimits[index] = {
          employeeId: this.employeesLimits[index].employeeId,
          employeeName: this.employeesLimits[index].employeeName,
          limitId: this.employeesLimits[index].limitId,
          isGlobal: false,
          yearLimit: employeeLimit.yearLimit,
          monthLimit: employeeLimit.monthLimit,
          rowLimit: employeeLimit.rowLimit
          };
        this.addEmployee(this.employeesLimits[index]);
        }
      this.employeesLimitsFormArray.disable();
      this.spinner.hide(); });
    this.openSnackBar();
  }

  cancelMyLimitsEdit(): void {
    this.myLimitsForm.disable();
    this.showMyLimitsEditBtns = !this.showMyLimitsEditBtns;
    document.getElementById('edit-my-limits').classList.remove('hide');
    this.myLimitsForm.patchValue({
      myYearlyLimit: this.userLimits.yearLimit,
      myMonthlyLimit: this.userLimits.monthLimit,
      myRowLimit: this.userLimits.rowLimit
    });
  }

  cancelGlobalLimitsEdit(): void {
    this.globalLimitsForm.disable();
    this.showGlobalLimitsEditBtns = !this.showGlobalLimitsEditBtns;
    document.getElementById('edit-global-limits').classList.remove('hide');
    this.globalLimitsForm.patchValue({
      globalYearlyLimit: this.globalLimit.yearLimit,
      globalMonthlyLimit: this.globalLimit.monthLimit,
      globalRowLimit: this.globalLimit.rowLimit
    });
  }

  cancelEmployeeLimitsEdit(): void {
    this.hideEmployeeLimitEditBtn = !this.hideEmployeeLimitEditBtn;
    this.employeesLimitsFormArray.disable();
    this.showEmployeeLimitsEditBtns = !this.showEmployeeLimitsEditBtns;
  }

  handleIfClosedWhileInEditMode(): void {
    if (this.hideEmployeeLimitEditBtn === true) {
      this.hideEmployeeLimitEditBtn = !this.hideEmployeeLimitEditBtn;
      this.employeesLimitsFormArray.disable();
      this.showEmployeeLimitsEditBtns = !this.showEmployeeLimitsEditBtns;
    }
  }

  patchEmployeeLimitsValue(index: number, form: FormGroup): void {
    form.patchValue({
      employeeYearlyLimit: this.employeesLimits[index].yearLimit,
      employeeMonthlyLimit: this.employeesLimits[index].monthLimit,
      employeeRowLimit: this.employeesLimits[index].rowLimit
    });
  }

  saveMyLimits(): void {
    this.employeeLimit = {
      employeeId: this.userLimits.employeeId,
      yearLimit: this.myLimitsForm.get('myYearlyLimit').value,
      monthLimit: this.myLimitsForm.get('myMonthlyLimit').value,
      rowLimit: this.myLimitsForm.get('myRowLimit').value
    };
    this.settingsService
      .changeEmployeeLimit(this.employeeLimit)
      .subscribe(limit =>  this.userLimits = {
      employeeId: this.userLimits.employeeId,
      limitId: this.userLimits.limitId,
      yearLimit: limit.yearLimit,
      monthLimit: limit.monthLimit,
      rowLimit: limit.rowLimit,
      isBoss: this.userLimits.isBoss
    });
    this.showMyLimitsEditBtns = !this.showMyLimitsEditBtns;
    this.myLimitsForm.disable();
    this.openSnackBar();
  }

  saveGlobalLimits(): void {
    this.setGlobalLimit = {
      yearLimit: this.globalLimitsForm.get('globalYearlyLimit').value,
      monthLimit: this.globalLimitsForm.get('globalMonthlyLimit').value,
      rowLimit: this.globalLimitsForm.get('globalRowLimit').value
    };
    this.settingsService
      .changeGlobalLimit(this.setGlobalLimit)
      .subscribe(limit =>  this.globalLimit = {
        limitId: this.globalLimit.limitId,
        yearLimit: limit.yearLimit,
        monthLimit: limit.monthLimit,
        rowLimit: limit.rowLimit
      });
    this.globalLimitsForm.disable();
    this.showGlobalLimitsEditBtns = !this.showGlobalLimitsEditBtns;
    document.getElementById('edit-global-limits').classList.remove('hide');
    this.openSnackBar();
  }

  saveEmployeeLimits(index: number, form: FormGroup): void {
    this.employeeLimit = {
      employeeId: form.get('employeeId').value,
      yearLimit: form.get('employeeYearlyLimit').value,
      monthLimit: form.get('employeeMonthlyLimit').value,
      rowLimit: form.get('employeeRowLimit').value
    };
    this.settingsService
      .changeEmployeeLimit(this.employeeLimit)
      .subscribe(employeeLimit =>  this.employeesLimits[index] = {
        employeeId: this.employeesLimits[index].employeeId,
        employeeName: this.employeesLimits[index].employeeName,
        limitId: this.employeesLimits[index].limitId,
        isGlobal: false,
        yearLimit: employeeLimit.yearLimit,
        monthLimit: employeeLimit.monthLimit,
        rowLimit: employeeLimit.rowLimit
      });
    this.cancelEmployeeLimitsEdit();
    this.openSnackBar();
  }

  getYearlyLimitErrorMessage() {
    if (this.myLimitsForm.controls.myYearlyLimit.hasError('required')
      || this.globalLimitsForm.controls.globalYearlyLimit.hasError('required')
      || this.allEmployeesLimitsForm.controls.allEmployeesYearlyLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (this.myLimitsForm.controls.myYearlyLimit.hasError('min')
      || this.globalLimitsForm.controls.globalYearlyLimit.hasError('min')
      || this.allEmployeesLimitsForm.controls.allEmployeesYearlyLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (this.myLimitsForm.controls.myYearlyLimit.hasError('max')
      || this.globalLimitsForm.controls.globalYearlyLimit.hasError('max')
      || this.allEmployeesLimitsForm.controls.allEmployeesYearlyLimit.hasError('max')) {
      return  'Maximum value for this field is 30';
    }
    return '';
  }

  getMonthlyLimitsErrorMessage() {
    if (this.myLimitsForm.controls.myMonthlyLimit.hasError('required')
      || this.globalLimitsForm.controls.globalMonthlyLimit.hasError('required')
      || this.allEmployeesLimitsForm.controls.allEmployeesMonthlyLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (this.myLimitsForm.controls.myMonthlyLimit.hasError('min')
      || this.globalLimitsForm.controls.globalMonthlyLimit.hasError('min')
      || this.allEmployeesLimitsForm.controls.allEmployeesMonthlyLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (this.myLimitsForm.controls.myMonthlyLimit.hasError('max')
      || this.globalLimitsForm.controls.globalMonthlyLimit.hasError('max')
      || this.allEmployeesLimitsForm.controls.allEmployeesMonthlyLimit.hasError('max')) {
      return  'Maximum value for this field is 10';
    }
    return '';
  }

  getInRowLimitsErrorMessage() {
    if (this.myLimitsForm.controls.myRowLimit.hasError('required')
      || this.globalLimitsForm.controls.globalRowLimit.hasError('required')
      || this.allEmployeesLimitsForm.controls.allEmployeesRowLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (this.myLimitsForm.controls.myRowLimit.hasError('min')
      || this.globalLimitsForm.controls.globalRowLimit.hasError('min')
      || this.allEmployeesLimitsForm.controls.allEmployeesRowLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (this.myLimitsForm.controls.myRowLimit.hasError('max')
      || this.globalLimitsForm.controls.globalRowLimit.hasError('max')
      || this.allEmployeesLimitsForm.controls.allEmployeesRowLimit.hasError('max')) {
      return  'Maximum value for this field is 5';
    }
    return '';
  }

  getEmployeeYearlyLimitErrorMessage(form: FormGroup) {
    if (form.controls.employeeYearlyLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (form.controls.employeeYearlyLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (form.controls.employeeYearlyLimit.hasError('max')) {
      return  'Maximum value for this field is 30';
    }
    return '';
  }

  getEmployeeMonthlyLimitErrorMessage(form: FormGroup) {
    if (form.controls.employeeMonthlyLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (form.controls.employeeMonthlyLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (form.controls.employeeMonthlyLimit.hasError('max')) {
      return  'Maximum value for this field is 10';
    }
    return '';
  }

  getEmployeeRowLimitErrorMessage(form: FormGroup) {
    if (form.controls.employeeRowLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (form.controls.employeeRowLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (form.controls.employeeRowLimit.hasError('max')) {
      return  'Maximum value for this field is 5';
    }
    return '';
  }
}
