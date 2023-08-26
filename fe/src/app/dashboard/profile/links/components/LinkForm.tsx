import Input from '@/app/components/atoms/Input';
import Textarea from '@/app/components/atoms/Textarea';
import Switch from '@/app/components/molecules/Switch';
import { useFormContext } from 'react-hook-form';
import LinkImage from './LinkImage';

export default function LinkForm() {
  const { setValue, watch } = useFormContext();

  const onFinishUpload = (image: string) => setValue('thumbnail', image);

  return (
    <div>
      <div className="mb-3">
        <div className="font-medium">
          Title <span className="text-red-400">*</span>
        </div>
        <Input name="title" placeholder="Title" />
      </div>
      <div className="mb-3">
        <div className="font-medium">Description</div>
        <Textarea name="description" placeholder="Description" rows={5} />
      </div>
      <div className="mb-3">
        <div className="font-medium">
          Url <span className="text-red-400">*</span>
        </div>
        <Input name="url" placeholder={`http://google.com`} />
      </div>
      <div className="mt-3">
        <div className="font-medium mb-2">Image</div>
        <LinkImage onFinishUpload={onFinishUpload} image={watch('thumbnail')} />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="text-md">
          <div>
            Collect the name and emails of users who want to view the link
          </div>
        </div>
        <div>
          <Switch name="isCollectViewerInfo" />
        </div>
      </div>
      <div className="mt-3 flex justify-between">
        <div className="text-md">
          <div>Show link to everyone?</div>
        </div>
        <div>
          <Switch name="isActive" />
        </div>
      </div>
    </div>
  );
}
