import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { CustomAlertService } from "src/app/shared/custom-alert.service";
import { environment } from "src/environments/environment";
import { RepositoryService } from "../../repository.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.scss"],
})
export class ExpensesComponent implements OnInit {
  expenseModel: any;
  searchTerm: string;
  ExpenseForm: UntypedFormGroup;
  submitted: boolean;
  isEditingModal = false;
  currentExpense: any;

  constructor(
    public formBuilder: UntypedFormBuilder,

    private repositoryService: RepositoryService,
    private customAlert: CustomAlertService,
    private modalService: NgbModal
  ) {}

  errors = {
    title: [],
    amount: [],
    description: [],
  };

  ngOnInit(): void {
    this.getAllExpenses();
    //   {
    //     "title":"Food",
    //     "amount": 79999,
    //     "description": "Kwa Hajiri ya chakular changu"
    // }
    this.ExpenseForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });
  }

  get form() {
    return this.ExpenseForm.controls;
  }

  addExpense() {
    this.submitted = true;
    if (this.ExpenseForm.invalid) {
      return;
    }

    const url = `${environment.E_SHOP_BASE_URL}${environment.IMS.IMS_EXPENSES_BASE_URL}`;
    console.log(url);
    console.log(this.ExpenseForm.value),
      this.repositoryService.addItem(
        url,
        this.ExpenseForm.value,

        (data) => {
          this.customAlert.successToast(
            "Success",
            "Expense added successfully"
          );
          this.modalService.dismissAll();
          this.getAllExpenses();
        },
        (error) => {
          console.log(error);
          this.customAlert.errorToast("Error", "Error in adding expense");
        }
      );
  }

  getAllExpenses() {
    const url = `${environment.E_SHOP_BASE_URL}${environment.IMS.IMS_EXPENSES_BASE_URL}`;
    console.log(url);
    this.repositoryService.getList(
      url,
      (data) => {
        console.log(data);
        this.expenseModel = data;
      },
      (error) => {
        this.customAlert.errorToast("Error", "Error in loading expenses");
      }
    );
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  openEditModal(content: any, expense: any) {
    this.isEditingModal = true;
    this.currentExpense = expense;
    this.modalService.open(content, { centered: true });
    this.ExpenseForm.patchValue({
      title: expense.title,
      amount: expense.amount,
      description: expense.description,
    });
  }

  editExpenses() {
    this.submitted = true;
    if (this.ExpenseForm.invalid) {
      return;
    }
    const url =
      `${environment.E_SHOP_BASE_URL}${environment.IMS.IMS_EXPENSES_BASE_URL}` +
      `?expense_id=${this.currentExpense.id}`;
    this.repositoryService.updateItem(
      url,
      this.ExpenseForm.value,
      (data) => {
        this.customAlert.successToast(
          "Success",
          "Expense updated successfully"
        );
        this.modalService.dismissAll();
        this.getAllExpenses();
      },
      (error) => {
        this.customAlert.errorToast("Error", "Error in updating expense");
      }
    );
  }

  deleteExpense(expense: any) {
    const url =
      `${environment.E_SHOP_BASE_URL}${environment.IMS.IMS_EXPENSES_BASE_URL}` +
      `?expense_id=${expense.id}`;

    this.repositoryService.deleteItem(
      url,
      (data) => {
        this.customAlert.successToast(
          "Success",
          "Expense deleted successfully"
        );
        this.getAllExpenses();
      },
      (error) => {
        this.customAlert.errorToast("Error", "Error in deleting expense");
      }
    );
  }
}
