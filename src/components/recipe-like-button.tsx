"use client";
import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { motion } from "motion/react";

interface RecipeLikeButtonProps {
  recipeId: string;
}

export function RecipeLikeButton({ recipeId }: RecipeLikeButtonProps) {
  const utils = api.useUtils();

  const toggleLike = api.likes.toggleLike.useMutation({
    onMutate: async () => {
      await utils.likes.isLikedByUser.cancel();

      const prev = utils.likes.isLikedByUser.getData({ recipeId });

      utils.likes.isLikedByUser.setData({ recipeId }, (old) => ({
        isLiked: !old?.isLiked,
        likesCount: old?.isLiked
          ? (old.likesCount || 1) - 1
          : (old?.likesCount || 0) + 1,
      }));

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        utils.likes.isLikedByUser.setData({ recipeId }, context.prev);
      }
    },
    onSettled: () => {
      utils.likes.isLikedByUser.invalidate();
    },
  });

  const { data: likeData, isLoading: likeLoading } =
    api.likes.isLikedByUser.useQuery({ recipeId });

  if (likeLoading || !likeData) return null;

  const isLiked = likeData.isLiked;
  const likesCount = likeData.likesCount;

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm">{likesCount}</span>
      <Button
        variant="ghost"
        size="icon"
        className={isLiked ? "text-red-500" : ""}
        disabled={toggleLike.isPending}
        onClick={async (e) => {
          e.preventDefault();
          toggleLike.mutate({ recipeId });
        }}
      >
        <motion.div
          key={isLiked ? "liked" : "not-liked"}
          initial={{ scale: 1 }}
          animate={{
            scale: isLiked ? [1, 1.4, 1] : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 0.8 }}
        >
          <HeartIcon
            fill={isLiked ? "red" : "none"}
            className="transition-colors"
          />
        </motion.div>
      </Button>
    </div>
  );
}
