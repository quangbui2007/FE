import { ACTION_CONFIRM } from "@/constants";
import { closeConfirmAlert, deleteFeatureImage } from "@/store/common-slice";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useDispatch, useSelector } from "react-redux";

export default function ConfirmAlert() {
  const { confirmAlertData } = useSelector((state) => state.commonFeature);
  const dispatch = useDispatch();

  if (!confirmAlertData?.open) return null;

  const {
    open,
    title = "Xác nhận hành động",
    actionKey,
    onCancel, // có thể là undefined
  } = confirmAlertData || {};

  const handleCancel = () => {
    if (onCancel) onCancel();
    else dispatch(closeConfirmAlert()); // 👉 mặc định close
  };

  const handleConfirm = () => {
    switch (actionKey) {
      case ACTION_CONFIRM.DELETE_IMAGE_BANNER:
        dispatch(deleteFeatureImage(confirmAlertData.payload));
        break;
      // case khác...
    }
    dispatch(closeConfirmAlert());
  };
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/50 fixed inset-0 z-40" />
        <AlertDialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm"
        >
          <AlertDialog.Title className="text-lg font-semibold mb-2">
            {title}
          </AlertDialog.Title>
          <div className="flex justify-end space-x-2">
            <AlertDialog.Cancel asChild>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Hủy
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
