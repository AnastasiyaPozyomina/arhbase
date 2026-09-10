
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: "https://sun9-54.userapi.com/impg/AFXmV3ovfm_NpZI28HkSLG7Ky_eI-8N8rMCNWA/dmsCrZxFBEw.jpg?size=1068x1802&quality=95&sign=ea729f35080c689920e8051fadedc5cc&type=album",
    thumbnail: "https://sun9-54.userapi.com/impg/AFXmV3ovfm_NpZI28HkSLG7Ky_eI-8N8rMCNWA/dmsCrZxFBEw.jpg?size=1068x1802&quality=95&sign=ea729f35080c689920e8051fadedc5cc&type=album",
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



