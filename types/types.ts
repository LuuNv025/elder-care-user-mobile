export type HeaderProps = {
  title?: string; // Tiêu đề hiển thị trên header
  showNotification?: boolean; // Có hiển thị nút thông báo không?
  showAvatar?: boolean; // Có hiển thị ảnh đại diện không?
  onPressNotification?: () => void; // Hàm xử lý khi bấm nút thông báo
  onPressAvatar?: () => void; // Hàm xử lý khi bấm vào avatar
};
