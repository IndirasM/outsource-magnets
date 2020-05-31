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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  globalLimit: GlobalLimits =  {
    limitId: 1,
    yearLimit: 12,
    monthLimit: 3,
    rowLimit: 3
    };

  userLimits: UserLimits = {
    employeeId: 1,
    limitId: 2,
    yearLimit: 15,
    monthLimit: 4,
    rowLimit: 3,
    isBoss: true
    };

  employeesLimits: EmployeesLimits[] = [ {
    employeeId: 2,
    employeeName: 'Name 2',
    limitId: 1,
    isGlobal: true,
    yearLimit: 12,
    monthLimit: 3,
    rowLimit: 3
    },
    {
      employeeId: 3,
      employeeName: 'Name 3',
      limitId: 2,
      isGlobal: false,
      yearLimit: 15,
      monthLimit: 4,
      rowLimit: 3
    },
    {
      employeeId: 4,
      employeeName: 'Name 4',
      limitId: 3,
      isGlobal: true,
      yearLimit: 13,
      monthLimit: 2,
      rowLimit: 2
    },
  ];

  showMyLimitsEditBtns = false;
  showGlobalLimitsEditBtns = false;
  showEmployeeLimitsEditBtns = false;
  hideEmployeeLimitEditBtn = false;
  successMessage = false;
  myLimitsForm = new FormGroup({
    myYearlyLimit: new FormControl(this.userLimits.yearLimit, [Validators.required, Validators.min(0), Validators.max(30)]),
    myMonthlyLimit: new FormControl(this.userLimits.monthLimit, [Validators.required, Validators.min(0), Validators.max(10)]),
    myRowLimit: new FormControl(this.userLimits.rowLimit, [Validators.required, Validators.min(0), Validators.max(5)]),
  });
  globalLimitsForm = new FormGroup({
    globalYearlyLimit: new FormControl(this.globalLimit.yearLimit, [Validators.required, Validators.min(0), Validators.max(30)]),
    globalMonthlyLimit: new FormControl(this.globalLimit.monthLimit, [Validators.required, Validators.min(0), Validators.max(10)]),
    globalRowLimit: new FormControl(this.globalLimit.rowLimit, [Validators.required, Validators.min(0), Validators.max(5)]),
  });

  employeesLimitsFormArray = new FormArray([]);
  setGlobalLimit: SetGlobalLimitRequestModel;
  employeeLimit: SetEmployeeLimits;
  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
/*    this.settingsService.getGlobalLimits().subscribe(
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
    this.settingsService.getEmployeesLimits().subscribe(
      resp => {
        this.employeesLimits = resp;
        for (const v in this.employeesLimits) {
          this.addEmployee(this.employeesLimits[v]);
        }
        this.employeesLimitsFormArray.disable();
      }
    ),
      error => {
        console.log(error.error.message);
      };*/
    for (const v in this.employeesLimits) {
      this.addEmployee(this.employeesLimits[v]);
    }
    this.employeesLimitsFormArray.disable();
    this.globalLimitsForm.disable();
    this.myLimitsForm.disable();
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
      yearLimit: this.myLimitsForm.get('myYearlyLimit').value,
      monthLimit: this.myLimitsForm.get('myMonthlyLimit').value,
      rowLimit: this.myLimitsForm.get('myRowLimit').value
    };
    console.log(this.employeeLimit);
    /*this.settingsService
      .changeEmployeeLimit(this.userLimits.employeeId, this.employeeLimit)
      .subscribe(limit =>  this.userLimits = {
      employeeId: this.userLimits.employeeId,
      limitId: this.userLimits.limitId,
      yearLimit: limit.yearLimit,
      monthLimit: limit.monthLimit,
      rowLimit: limit.rowLimit,
      isBoss: this.userLimits.isBoss
    });*/
    this.showMyLimitsEditBtns = !this.showMyLimitsEditBtns;
    this.myLimitsForm.disable();
    this.successMessage = !this.successMessage;
    document.getElementById('edit-my-limits').classList.remove('hide');
    setTimeout(function() {
      this.successMessage = !this.successMessage;
    }.bind(this), 5000);
  }

  saveGlobalLimits(): void {
    this.setGlobalLimit = {
      yearLimit: this.globalLimitsForm.get('globalYearlyLimit').value,
      monthLimit: this.globalLimitsForm.get('globalMonthlyLimit').value,
      rowLimit: this.globalLimitsForm.get('globalRowLimit').value
    };
    console.log(this.setGlobalLimit);
/*    this.settingsService
      .changeGlobalLimit(this.setGlobalLimit)
      .subscribe(limit =>  this.globalLimit = {
        limitId: this.globalLimit.limitId,
        yearLimit: limit.yearLimit,
        monthLimit: limit.monthLimit,
        rowLimit: limit.rowLimit
      });*/
    this.globalLimitsForm.disable();
    this.showGlobalLimitsEditBtns = !this.showGlobalLimitsEditBtns;
    this.successMessage = !this.successMessage;
    document.getElementById('edit-global-limits').classList.remove('hide');
    setTimeout(function() {
      this.successMessage = !this.successMessage;
    }.bind(this), 5000);
  }

  saveEmployeeLimits(index: number, form: FormGroup): void {
    this.employeeLimit = {
      yearLimit: form.get('employeeYearlyLimit').value,
      monthLimit: form.get('employeeMonthlyLimit').value,
      rowLimit: form.get('employeeRowLimit').value
    };
/*    this.settingsService
      .changeEmployeeLimit(form.get('employeeId').value, this.employeeLimit)
      .subscribe(employeeLimit =>  this.employeesLimits[index] = {
        employeeId: this.employeesLimits[index].employeeId,
        employeeName: this.employeesLimits[index].employeeName,
        limitId: this.employeesLimits[index].limitId,
        isGlobal: false,
        yearLimit: employeeLimit.yearLimit,
        monthLimit: employeeLimit.monthLimit,
        rowLimit: employeeLimit.rowLimit
      });*/
    console.log(this.employeeLimit);
    this.cancelEmployeeLimitsEdit();
    this.successMessage = !this.successMessage;
    setTimeout(function() {
      this.successMessage = !this.successMessage;
    }.bind(this), 5000);
  }

  getYearlyLimitErrorMessage() {
    if (this.myLimitsForm.controls.myYearlyLimit.hasError('required') || this.globalLimitsForm.controls.globalYearlyLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (this.myLimitsForm.controls.myYearlyLimit.hasError('min') || this.globalLimitsForm.controls.globalYearlyLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (this.myLimitsForm.controls.myYearlyLimit.hasError('max') || this.globalLimitsForm.controls.globalYearlyLimit.hasError('max')) {
      return  'Maximum value for this field is 30';
    }
    return '';
  }

  getMonthlyLimitsErrorMessage() {
    if (this.myLimitsForm.controls.myMonthlyLimit.hasError('required') || this.globalLimitsForm.controls.globalMonthlyLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (this.myLimitsForm.controls.myMonthlyLimit.hasError('min') || this.globalLimitsForm.controls.globalMonthlyLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (this.myLimitsForm.controls.myMonthlyLimit.hasError('max') || this.globalLimitsForm.controls.globalMonthlyLimit.hasError('max')) {
      return  'Maximum value for this field is 10';
    }
    return '';
  }

  getInRowLimitsErrorMessage() {
    if (this.myLimitsForm.controls.myRowLimit.hasError('required') || this.globalLimitsForm.controls.globalRowLimit.hasError('required')) {
      return 'You must enter a value';
    } else if (this.myLimitsForm.controls.myRowLimit.hasError('min') || this.globalLimitsForm.controls.globalRowLimit.hasError('min')) {
      return 'Minimum value cannot be lower than 0';
    } else if (this.myLimitsForm.controls.myRowLimit.hasError('max') || this.globalLimitsForm.controls.globalRowLimit.hasError('max')) {
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
