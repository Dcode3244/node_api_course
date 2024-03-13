import prisma from "../db";

// Get all updates
export const getUpdates = async (req, res) => {
  const updates = await prisma.update.findMany({
    where: {
      product: {
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: updates });
};

// Get one update
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
      product: {
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: update });
};

// Create update
export const createUpdate = async (req, res) => {
  const { body, title, productId } = req.body;

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsToId: req.user.id,
    },
  });

  if (!product) {
    res.json({ message: "nope" });
  } else {
    const update = await prisma.update.create({
      data: {
        body,
        title,
        productId,
      },
    });

    res.json({ data: update });
  }
};

// update one update
export const updateUpdate = async (req, res) => {
  try {
    const updates = await prisma.update.update({
      where: {
        id: req.params.id,
        product: {
          belongsToId: req.user.id,
        },
      },
      data: { ...req.body },
    });

    res.json({ data: updates });
  } catch (error) {
    res.json({ errMsg: error });
  }
};

// delete update
export const deleteUpdate = async (req, res) => {
  try {
    const update = await prisma.update.delete({
      where: {
        id: req.params.id,
        product: {
          belongsToId: req.user.id,
        },
      },
    });

    res.json({ data: update });
  } catch (error) {
    return res.json({ message: error });
  }
};
