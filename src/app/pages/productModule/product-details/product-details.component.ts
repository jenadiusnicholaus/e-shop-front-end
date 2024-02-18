import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { RepositoryService } from "../../repository.service";
import { en } from "@fullcalendar/core/internal-common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomAlertService } from "src/app/shared/custom-alert.service";

import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from "@angular/common/http";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  currentRate = 2.4;
  productID: any;
  productDetail: any;
  productImages: any;
  productSpecs: any;

  rate = 3.14;
  breadCrumbItems: Array<{}>;
  media_url = environment.E_SHOP_MEDIA_BASE_URL;
  inlinecolor: string;
  pickedColor: string;
  selectedSize: string;
  productSizes: any[] = [
    { value: "S", label: "Small" },
    { value: "M", label: "Medium" },
    { value: "L", label: "Large" },
    { value: "XL", label: "Extra Large" },
  ];
  files: File[] = [];
  uploadProgress = 0;

  uploading = false;

  productSpecForm: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private repositoryService: RepositoryService,
    private modalService: NgbModal,
    public customAlert: CustomAlertService,
    private formBuilder: UntypedFormBuilder,

    private http: HttpClient
  ) {}
  ngOnInit(): void {
    this.getProuctImages();
    this.breadCrumbItems = [
      { label: "Product" },
      { label: "Product Detail", active: true },
    ];

    this.pickedColor = "#3bafda";
    this.getProductDetails();
    this.getSpecs();

    this.productSpecForm = this.formBuilder.group({
      spec_name: ["", []],
      spec_value: ["", []],
    });
  }

  getProuctImages() {
    this.route.params.subscribe((params) => {
      this.productID = +params["ID"];
      const url =
        environment.E_SHOP_BASE_URL +
        environment.IMS.IMS_PRODUDCT_IMAGES +
        `?product_id=${params["ID"]}`;

      this.repositoryService.getSingle(
        url,
        (data) => {
          this.productImages = data;
        },
        (eero) => {}
      );
    });
  }

  getProductDetails() {
    this.route.params.subscribe((params) => {
      this.productID = +params["ID"];

      const url =
        environment.E_SHOP_BASE_URL +
        environment.IMS.IMS_PRODUCT_DETAILS +
        `?product_id=${params["ID"]}`;

      this.repositoryService.getSingle(
        url,
        (data) => {
          this.productDetail = data;
          this.getAverageRating();
        },
        (eero) => {}
      );
    });
  }

  addImagesModal(modal: any) {
    this.modalService.open(modal, { scrollable: true, size: "lg" });
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  addImages() {
    if (this.files.length > 0) {
      this.uploadFiles();
    } else {
      // this.customAlert.showNotification("error", "Please select images to add");
    }
  }

  uploadFiles() {
    this.uploading = true;
    this.uploadProgress = 0;

    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_PRODUDCT_IMAGES;
    const filesData = this.files.map((file, index) => {
      return this.checkFileSize(file).then((size) => {
        if (size) {
          return this.checkFileExtension(file).then((extension) => {
            if (extension) {
              return new Promise((resolve, reject) => {
                const reader = new FileReader(); // create a new FileReader for each file
                reader.onload = (event) => {
                  resolve({
                    image: event.target.result,
                    product: this.productID.toString(),
                  });
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(file);
              });
            } else {
              this.customAlert.errorToast(
                "error",
                "Invalid file extension we only accept png, jpg, jpeg files"
              );
              throw new Error("Invalid file extension");
            }
          });
        } else {
          this.customAlert.errorToast(
            "error",
            "Invalid file size we only accept files less than 1MB in size"
          );
          throw new Error("Invalid file size");
        }
      });
    });

    if (filesData.length > 4) {
      this.uploading = false;
      this.customAlert.errorToast(
        "error",
        "You can only upload 4 images at a time"
      );
      return;
    }

    Promise.all(filesData)
      .then((data) => {
        this.http
          .post(url, filesData, {
            reportProgress: true,
            observe: "events",
          })
          .subscribe(
            (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(
                  (100 * event.loaded) / event.total
                );
              } else if (event instanceof HttpResponse) {
                this.uploading = false;
                this.customAlert.successToast(
                  "success",
                  "Images added successfully"
                );
                this.dismissModal();
              }
            },
            (error: HttpErrorResponse) => {
              this.uploading = false;
              console.log(error);
              this.customAlert.errorToast("error", `${error}`);
              this.getProductDetails();
            }
          );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dismissModal() {
    this.modalService.dismissAll();
    this.files = [];
    this.getProductDetails();
    this.getProuctImages();
  }

  checkFileDimensions(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 200 && img.height === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
    });
  }

  checkFileSize(file) {
    return new Promise((resolve, reject) => {
      if (file.size < 1000000) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  checkFileExtension(file) {
    return new Promise((resolve, reject) => {
      const extension = file.name.split(".").pop();
      if (extension === "png" || extension === "jpg" || extension === "jpeg") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  deleteImage(imageID: any) {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUDCT_IMAGES +
      `?image_id=${imageID}`;
    this.repositoryService.deleteItem(
      url,
      (data) => {
        this.customAlert.successToast("success", "Image deleted successfully");
        this.getProductDetails();
      },
      (error) => {
        this.customAlert.errorToast("error", "Error deleting image");
      }
    );
  }

  addProductColor() {
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_PRODUDCT_COLOR;

    const data = {
      product: this.productID,
      color: this.pickedColor,
    };

    this.repositoryService.addItem(
      url,
      data,
      (data) => {
        this.customAlert.successToast("success", "Color added successfully");
        this.getProductDetails();
      },
      (error) => {
        this.customAlert.errorToast("error", "Error adding color");
      }
    );
  }

  editColorProdcut(colorID, color) {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUDCT_COLOR +
      `?color_id=${colorID}`;

    const data = {
      product: this.productID,
      color: color,
    };

    this.repositoryService.updateItem(
      url,
      data,
      (data) => {
        this.customAlert.successToast("success", "Color updated successfully");
        this.getProductDetails();
      },
      (error) => {
        this.customAlert.errorToast("error", "Error updating color");
      }
    );
  }

  deleteProductColor(colorID: any) {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUDCT_COLOR +
      `?color_id=${colorID}`;
    this.repositoryService.deleteItem(
      url,
      (data) => {
        this.customAlert.successToast("success", "Color deleted successfully");
        this.getProductDetails();
      },
      (error) => {
        this.customAlert.errorToast("error", "Error deleting color");
      }
    );
  }

  addProductSize() {
    if (!this.selectedSize) {
      this.customAlert.errorToast("error", "Please select a size");
      return;
    }

    const url = environment.E_SHOP_BASE_URL + environment.IMS.IMS_PRODUDCT_SIZE;

    const data = {
      product: this.productID,
      size: this.selectedSize,
    };

    this.repositoryService.addItem(
      url,
      data,
      (data) => {
        this.customAlert.successToast("success", "Size added successfully");
        this.getProductDetails();
      },
      (error) => {
        this.customAlert.errorToast("error", "Error adding size");
      }
    );
  }

  deleteProductSize(sizeID: any) {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUDCT_SIZE +
      `?size_id=${sizeID}`;
    this.repositoryService.deleteItem(
      url,
      (data) => {
        this.customAlert.successToast("success", "Size deleted successfully");
        this.getProductDetails();
      },
      (error) => {
        this.customAlert.errorToast("error", "Error deleting size");
      }
    );
  }

  addProductSpec() {
    const url =
      environment.E_SHOP_BASE_URL + environment.IMS.IMS_PRODUDCT_SPECS;

    if (this.productSpecForm.invalid) {
      this.customAlert.errorToast("error", "Please fill in all fields");
      return;
    }

    const data = {
      product: this.productID,
      spec_name: this.productSpecForm.value.spec_name,
      spec_value: this.productSpecForm.value.spec_value,
    };

    this.repositoryService.addItem(
      url,
      data,
      (data) => {
        this.customAlert.successToast("success", "Specs added successfully");
        this.getProductDetails();
        this.getSpecs();
      },
      (error) => {
        this.customAlert.errorToast("error", `${error}`);
      }
    );
  }

  deleteProductSpec(specID: any) {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUDCT_SPECS +
      `?spec_id=${specID}`;
    this.repositoryService.deleteItem(
      url,
      (data) => {
        this.customAlert.successToast("success", "Specs deleted successfully");

        this.getSpecs();
      },
      (error) => {
        this.customAlert.errorToast("error", "Error deleting specs");
      }
    );
  }

  getSpecs() {
    const url =
      environment.E_SHOP_BASE_URL +
      environment.IMS.IMS_PRODUDCT_SPECS +
      `?product_id=${this.productID}`;
    this.repositoryService.getSingle(
      url,
      (data) => {
        this.productSpecs = data?.specs;
      },
      (eero) => {}
    );
  }

  getAverageRating() {
    let total = 0;
    let count = 0;

    this.productDetail?.data?.product_reviews?.forEach((element) => {
      total += element.rating;
      count++;
    });

    this.currentRate = count > 0 ? parseFloat((total / count).toFixed(2)) : 0;

    return this.currentRate;
  }

  getDiscountedPercentage() {
    if (
      this.productDetail?.data?.discount_price &&
      this.productDetail?.data?.selling_price
    ) {
      let discount = this.productDetail.data.discount_price;
      let price = this.productDetail.data.selling_price;
      return Math.round(((price - discount) / price) * 100);
    }
    return null;
  }
}
