import { Button } from "@/components/ui/button";

function AddSource() {
  return (
    <div>
      <Button className="mx-3 bg-primary hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
        Add Source
      </Button>
    </div>
  );
}

export default AddSource;
