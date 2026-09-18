import GalleryPhoto from '../models/GalleryPhoto.js';

// GET /api/gallery?category=majlis
export const getGalleryPhotos = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const photos = await GalleryPhoto.find(filter).sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    next(error);
  }
};

// POST /api/gallery (admin only)
export const createGalleryPhoto = async (req, res, next) => {
  try {
    const photo = await GalleryPhoto.create(req.body);
    res.status(201).json(photo);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/gallery/:id (admin only)
export const deleteGalleryPhoto = async (req, res, next) => {
  try {
    const photo = await GalleryPhoto.findByIdAndDelete(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Gallery photo not found' });
    res.json({ message: 'Gallery photo deleted successfully' });
  } catch (error) {
    next(error);
  }
};
