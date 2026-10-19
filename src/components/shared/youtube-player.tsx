import { Play } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function YouTubePlayer({ videoId }: { videoId: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          aria-label="Assistir ao vídeo do Pedal do Tigre"
          className="group relative h-auto w-full overflow-hidden rounded-xl p-0"
        >
          <span className="relative block aspect-video w-full">
            <Image
              src="/assets/images/pedal-do-tigre.jpg"
              alt="Momentos do Pedal do Tigre"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                <Play className="size-7 fill-current" />
              </span>
            </span>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
              w-[calc(100vw-20rem)]
              max-w-none
              overflow-hidden
              border-0
              bg-black
              p-0
              sm:max-w-none
            "
      >
        <DialogTitle className="sr-only">Vídeo do Pedal do Tigre</DialogTitle>

        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title="Vídeo do Pedal do Tigre"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
