import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class CustomAlertService {
  constructor() {}

  successmsg(title: String, text: String, icon) {
    Swal.fire({
      title: `${title}`,
      text: `${text}!`,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#5438dc",
      cancelButtonColor: "#ff3d60",
    });
  }
  successToast(title: String, text: String, icon?) {
    Swal.fire({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      title: title?.toString() ?? "success!", // "Warning!",
      text: text?.toString() ?? "",
      icon: icon ?? "success",
    });
  }

  errorToast(title: String, text: String, icon?) {
    Swal.fire({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      title: title?.toString() ?? "Warning!",
      text: text?.toString() ?? "",
      icon: icon ?? "error",
    });


  }

  warningToast(title: String, text: String, icon?) {
    Swal.fire({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      title: title?.toString() ?? "Warning!",
      text: text?.toString() ?? "",
      icon: icon ?? "warning",
    });
  }


  async comfirmAndDelete(iAlertParams: IAlertParams) {
    const result = await Swal.fire({
      title: `${iAlertParams.title}`,
      text: `${iAlertParams.text}!`,
      icon: iAlertParams.icon,
      showCancelButton: true,
      confirmButtonColor: iAlertParams.confirmButtonColor ?? "#5438dc",
      cancelButtonColor: iAlertParams.cancelButtonColor ?? "#ff3d60",
    });

    if (result.value) {
      iAlertParams.comfirm(result.value);
    }
  }
}

interface IAlertParams {
  title: String;
  text: String;
  icon;
  comfirm: (data: any) => void;
  confirmButtonColor?;
  cancelButtonColor?;
}
