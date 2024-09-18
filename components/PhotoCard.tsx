'use client';

import { revalidate, revalidateWithRedirect } from "../action";
import { useCallback, useMemo, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PhotoCard = ({photoId}: {
    photoId: string;
}) => {
     const maybeNextPhotoId = useMemo(() => parseInt(photoId, 10) + 1, [photoId]);
     const [, startTransition] = useTransition();
     const router = useRouter();

     const handleClickLink = useCallback(() => {
       startTransition(() => {
         void revalidate();
       });
     }, []);

     const handleClickButton = useCallback(() => {
       startTransition(() => {
        void revalidate();
        router.replace(`/photos/${maybeNextPhotoId}`);
       });
     }, []);

     const handleClickButtonWithRedirect = useCallback(() => {
       startTransition(() => {
         void revalidateWithRedirect(maybeNextPhotoId);
       });
     }, [maybeNextPhotoId]);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {photoId}
        <Link href={`/photos/${maybeNextPhotoId}`}>Next Image</Link>
        <Link onClick={handleClickLink} href={`/photos/${maybeNextPhotoId}`}>
          Next Image With revalidate
        </Link>
        <button onClick={handleClickButton}>
          Next Image with revalidate & router.replace
        </button>
        <button onClick={handleClickButtonWithRedirect}>
          Next Image with revalidate & redirect
        </button>
      </div>
    );
}

export default PhotoCard;