import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { Customer } from '../../models/customer';
import { Billing, NewBilling } from '../../models/billing';
import {BillingsService } from '../../services/billings.service';
import { Product } from 'src/app/models/product';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';

@Component({
  templateUrl: 'billings.component.html',
  styleUrls: ['./billings.component.scss']
})

export class BillingsComponent {
  dataSource: Billing[] = [];
  customers: Customer[] = [];
  optionsProducts: Product[] = [];
  popupProductsVisible = false;
  popupFormCreateVisible = false;
  popupFormEditVisible = false;
  currentBilling: Billing | null = null;
  newBilling: any = {
    idCustomer: null,
    idsProducts: []
  };
  billingEdit: any = {
    id: null,
    idNewCustomer: null
  };

  buttonEditBillingOptions: any = {
    text: 'Save',
    type: 'success',
    useSubmitBehavior: true,
  };

  selectProductBoxes: {
    id: number | null;
    quantity: number
  }[] = [{ id: null, quantity: 0 }];

  constructor(private _billingsService:BillingsService) {
    this._billingsService.getBillings().subscribe((resp) => {this.dataSource = resp});
    this._billingsService.getCustomers().subscribe((resp) => {this.customers = resp});
    this._billingsService.getProducts().subscribe((resp) => {this.optionsProducts = resp});

    this.showProducts = this.showProducts.bind(this);
    this.showFormCreate = this.showFormCreate.bind(this);
    this.showFormEdit = this.showFormEdit.bind(this);
    this.confirmDeleteBilling = this.confirmDeleteBilling.bind(this);
  }

  handleSelectBoxValueChange(index: number, value: any) {
    this.selectProductBoxes[index].id = value;
  }

  handleNumberBoxValueChange(index: number, value: any) {
    this.selectProductBoxes[index].quantity = value;
  }

  addSelectBox() {
    this.selectProductBoxes.push({ id: null, quantity: 0 });
  }

  showFormEdit(event: any): void {
    this.billingEdit.id = event.row.data.id;
    this.popupFormEditVisible = true;
    
  }

  showProducts(event: any): void {
    this.currentBilling = event.row.data;
    this.popupProductsVisible = true;
  }

  showFormCreate(): void {
    this.popupFormCreateVisible = true;
  }

  confirmDeleteBilling(event: any): void {
    const idBilling = event.row.data.id || null;
    const result = confirm("<i>Are you sure to delete this billing?</i>", "Confirm");
    result.then((dialogResult) => {
      if(dialogResult) {
        this._deleteBilling(idBilling);
      }
    });
  }


  onFormCreateBilling(): void {
 
    this.newBilling.idsProducts = [...this.selectProductBoxes.filter((x: any) => x.quantity > 0)];
    if(this.newBilling.idsProducts.length <= 0) {
      notify('At least one product', 'error');
      return;
    }

    if(!this.newBilling.idCustomer) {
      notify('Id customer is required', 'error');
      return;
    }

    if(this.newBilling.idsProducts.find((x: any) => !x.id || x.id === '')){
      notify('Produts error', 'error');
      return;
    }

    // Merge products in case repeat
    const combinedObjects = this.newBilling.idsProducts.reduce((acc: any, obj: any) => {
      if (acc[obj.id]) {
        acc[obj.id].quantity += obj.quantity;
      } else {
        acc[obj.id] = obj;
      }
      return acc;
    }, {});
    
    const result = Object.values(combinedObjects);
    this.newBilling.idsProducts = [...result];

    this._createBilling(this.newBilling);
    
  } 

  onFormEditBilling(event: any): void {
    this._editBilling()
    event.preventDefault()
    
  } 

  private _editBilling(): void {
    this._billingsService.updateBilling(this.billingEdit).subscribe(() => 
      this._billingsService.getBillings().subscribe((resp) => 
        {this.dataSource = resp; this.popupFormEditVisible = false; this.billingEdit= {
          id: null,
          idNewCustomer: null
        };
        notify('Billing updated', 'success');
      }
      ))
  }

  private _createBilling(newBilling: NewBilling): void {
    this._billingsService.createBilling(newBilling).subscribe(() => 
      this._billingsService.getBillings().subscribe((resp) => 
        {this.dataSource = resp; this.popupFormCreateVisible = false; this.newBilling = {
          idCustomer: null,
          idsProducts: []
        };
        notify('Billing generated', 'success');
      }
      ))
  }

  private _deleteBilling(idBilling: number): void {
    this._billingsService.deleteBilling(idBilling).subscribe(() => {
      notify('Billing deleted', 'success');
      this.dataSource = this.dataSource.filter(x => x.id !== idBilling)
    });
  }
}
