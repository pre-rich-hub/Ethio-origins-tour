const CLOUDINARY_UPLOAD_SEGMENT = '/image/upload/'

export const cloudinaryTransforms = {
  hero: 'f_auto,q_auto,w_1920,c_fill,g_auto',
  card: 'f_auto,q_auto,w_800,h_600,c_fill,g_auto',
  gallery: 'f_auto,q_auto,w_900,h_700,c_fill,g_auto',
  thumbnail: 'f_auto,q_auto,w_400,h_300,c_fill,g_auto',
  portrait: 'f_auto,q_auto,w_900,h_1200,c_fill,g_auto',
} as const

export function cloudinaryImage(
  src: string,
  transform: (typeof cloudinaryTransforms)[keyof typeof cloudinaryTransforms],
) {
  if (!src.includes('res.cloudinary.com') || !src.includes(CLOUDINARY_UPLOAD_SEGMENT)) {
    return src
  }

  const [prefix, rest] = src.split(CLOUDINARY_UPLOAD_SEGMENT)
  const segments = rest.split('/')
  const firstSegment = segments[0] ?? ''
  const hasExistingTransform =
    firstSegment.includes(',') || /^[a-z]_|^f_auto$|^q_auto$/.test(firstSegment)
  const assetPath = hasExistingTransform ? segments.slice(1).join('/') : rest

  return `${prefix}${CLOUDINARY_UPLOAD_SEGMENT}${transform}/${assetPath}`
}
