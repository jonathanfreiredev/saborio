const input = [
  { type: "step-start" },
  {
    type: "tool-generateRecipeImage",
    toolCallId: "call_eZJGzucUI5YvZia2eSrHbYJA",
    state: "output-available",
    input: { recipeTitle: "Hamburguesa Clásica", styleHint: "rustic" },
    output: {
      success: true,
      imageUrl:
        "https://res.cloudinary.com/ddjovluur/image/upload/v1775398310/mantelazul/ssybniwpcj0fvdpouugy.jpg",
      message:
        "I've generated a professional photo of the Hamburguesa Clásica. It looks delicious!",
    },
    callProviderMetadata: {
      openai: {
        itemId: "fc_07e566c68a46537f0069d26da065e881a3b3e503e7a8300a50",
      },
    },
    resultProviderMetadata: {
      openai: {
        itemId: "fc_07e566c68a46537f0069d26da065e881a3b3e503e7a8300a50",
      },
    },
  },
  { type: "step-start" },
  {
    type: "text",
    text: "He generado una imagen profesional de la hamburguesa clásica. ¡Se ve deliciosa!\n\nSi necesitas más ayuda, como ajustar la receta o crear otra, ¡no dudes en decírmelo!",
    providerMetadata: {
      openai: {
        itemId: "msg_07e566c68a46537f0069d26da9270c81a3887e44301685f212",
      },
    },
    state: "done",
  },
];
