import SectionTitle from '@/components/SectionTitle';
import TextBlockWithButton from './aboutHome/TextBlockWithButton';
import { textAboutHome } from './aboutHome/textAboutHome';
import ImageBlock from '@/components/ImageBlock';
export default function AboutHome() {
  return (
    <div
    className="w-full h-full flex"
    >
      <div
      className='w-full h-full max-w-[1200px] m-auto py-20 px-10'
      >
        <SectionTitle 
        title='¿Quiénes somos?'
        className='text-center'
        />
        <div
        className="w-full h-auto flex gap-5 flex-wrap"
        >
          <TextBlockWithButton
          paragraphs={textAboutHome}
          buttonText="Conoce más sobre nosotros"
          buttonTo="/about"
          className="w-full lg:max-w-[700px]"
          />
          <ImageBlock
          src="/assets/aboutHome.jpeg"
          alt="Huellitas felices"
          className='w-full lg:max-w-[500px] min-w-[300px]'
          />

        </div>
      </div>
    </div>
  );
}