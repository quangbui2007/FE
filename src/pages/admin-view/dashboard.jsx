import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { ACTION_CONFIRM } from "@/constants";
import {
  addFeatureImage,
  getFeatureImages,
  openConfirmAlert,
} from "@/store/common-slice";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const handleClickDelete = (id) => {
    dispatch(
      openConfirmAlert({
        open: true,
        title: "Are you sure delete this banner?",
        actionKey: ACTION_CONFIRM.DELETE_IMAGE_BANNER,
        payload: id,
      })
    );
  };

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) return;
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button
        onClick={handleUploadFeatureImage}
        disabled={!uploadedImageUrl}
        className="mt-5 w-full"
      >
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem._id}>
                <span
                  className="cursor-pointer absolute top-2 right-2"
                  onClick={() => handleClickDelete(featureImgItem._id)}
                >
                  <CircleX />
                </span>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
