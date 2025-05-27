import SectionTitle from '@/components/SectionTitle';
import TextBlockWithButton from './aboutHome/TextBlockWithButton';
import { textAboutHome } from './aboutHome/textAboutHome';
export default function AboutHome() {
  return (
    <div
    className="w-full h-full flex"
    >
      <div
      className='w-full h-full max-w-[1200px] m-auto py-20 px-5'
      >
        <SectionTitle 
        title='¿Quiénes somos?'
        className='text-center'
        />
        <div
        className="w-full h-auto flex gap-5"
        >
          <TextBlockWithButton
          paragraphs={textAboutHome}
          buttonText="Conoce más sobre nosotros"
          buttonTo="/about"
          className="max-w-[700px]"
          />
          <div>image</div>

        </div>
      </div>
    </div>
  );
}