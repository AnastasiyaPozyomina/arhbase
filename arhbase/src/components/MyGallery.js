
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: "https://downloader.disk.yandex.ru/preview/a533f95ccc6b4fa62a5f6f8564f44ff6ab9f1a6722fce17f771c44f68d5ad950/66a78ac3/_2ik20Cenmmvt_ipgQAtRTJfaq_kyP9qRdx5fHoAJWIKjykGYbkUHNLxdVg1MqJqY5qX2-k5aiv7ZZJGJhkpzQ%3D%3D?uid=0&filename=IMG_9462.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1920x922",
    thumbnail: "https://downloader.disk.yandex.ru/preview/a533f95ccc6b4fa62a5f6f8564f44ff6ab9f1a6722fce17f771c44f68d5ad950/66a78ac3/_2ik20Cenmmvt_ipgQAtRTJfaq_kyP9qRdx5fHoAJWIKjykGYbkUHNLxdVg1MqJqY5qX2-k5aiv7ZZJGJhkpzQ%3D%3D?uid=0&filename=IMG_9462.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=1920x922",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export default function MyGallery() {
  return (
   <ImageGallery items={images} />

  );
}



