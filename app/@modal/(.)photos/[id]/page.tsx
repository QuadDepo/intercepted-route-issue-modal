import { Modal } from './modal';
import PhotoCard from '../../../../components/PhotoCard';

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
     <PhotoCard photoId={photoId} />
    </Modal>
  );
}
