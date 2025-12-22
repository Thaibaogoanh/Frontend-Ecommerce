# 🔧 TROUBLESHOOTING - Khắc Phục Sự Cố Frontend

## ❌ Vấn đề: Không mở được http://localhost:3000/

### ✅ Giải pháp:

#### 1. Kiểm tra Server đã chạy chưa

```bash
cd front-end
npm run dev
```

Bạn sẽ thấy output:
```
VITE v6.3.5  ready in 5917 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

#### 2. Kiểm tra Browser Console

Mở **Developer Tools** (F12) và kiểm tra:
- **Console tab**: Xem có lỗi JavaScript nào không
- **Network tab**: Xem có file nào load failed không

#### 3. Routing - App sử dụng Hash Routing

App này sử dụng **hash routing**, nghĩa là:
- ✅ **Đúng**: `http://localhost:3000/#home`
- ✅ **Đúng**: `http://localhost:3000/#blanks`
- ✅ **Đúng**: `http://localhost:3000/#login`
- ⚠️ **Có thể không hoạt động**: `http://localhost:3000/` (không có hash)

**Giải pháp**: Thêm redirect tự động hoặc truy cập với hash:

```javascript
// Trong App.tsx, khi không có hash, tự động redirect về #home
useEffect(() => {
  if (!window.location.hash) {
    window.location.hash = '#home';
  }
}, []);
```

#### 4. Kiểm tra CORS

Nếu backend chạy ở port khác (5000), đảm bảo CORS đã được enable trong backend.

#### 5. Kiểm tra API Connection

Mở **Network tab** trong Developer Tools và kiểm tra:
- API calls có bị failed không?
- Có lỗi CORS không?
- Backend có đang chạy không? (http://localhost:5000)

#### 6. Clear Cache và Reload

1. **Hard Reload**: `Ctrl + Shift + R` (Windows) hoặc `Cmd + Shift + R` (Mac)
2. **Clear Browser Cache**: Settings > Clear browsing data
3. **Incognito Mode**: Thử mở trong chế độ ẩn danh

#### 7. Kiểm tra Port đã bị chiếm chưa

```bash
# Windows PowerShell
netstat -ano | findstr :3000

# Nếu có process, kill nó:
taskkill /PID <PID> /F
```

#### 8. Reinstall Dependencies

```bash
cd front-end
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

#### 9. Kiểm tra File Cấu Hình

Đảm bảo các file sau tồn tại và đúng:
- ✅ `vite.config.ts` - Port 3000
- ✅ `index.html` - Có `<div id="root"></div>`
- ✅ `src/main.tsx` - Entry point
- ✅ `src/App.tsx` - Main component

#### 10. Kiểm tra Environment Variables

Tạo file `.env` trong `front-end/` nếu cần:

```env
VITE_API_URL=http://localhost:5000/api
VITE_INIT_DEMO=true
```

---

## 🐛 Các Lỗi Thường Gặp

### Lỗi 1: "Cannot find module"
**Nguyên nhân**: Dependencies chưa được cài đặt
**Giải pháp**: `npm install`

### Lỗi 2: "Port 3000 is already in use"
**Nguyên nhân**: Port đã bị chiếm
**Giải pháp**: 
- Kill process đang dùng port 3000
- Hoặc đổi port trong `vite.config.ts`:
```typescript
server: {
  port: 3001, // Đổi port
}
```

### Lỗi 3: "Failed to fetch" hoặc CORS error
**Nguyên nhân**: Backend chưa chạy hoặc CORS chưa được enable
**Giải pháp**: 
- Kiểm tra backend đã chạy chưa (http://localhost:5000)
- Kiểm tra CORS config trong backend

### Lỗi 4: Blank page (trang trắng)
**Nguyên nhân**: 
- JavaScript error
- CSS không load
- Routing issue

**Giải pháp**:
1. Mở Console (F12) xem lỗi
2. Kiểm tra Network tab xem file nào failed
3. Thử truy cập với hash: `http://localhost:3000/#home`

### Lỗi 5: "Module not found" hoặc import errors
**Nguyên nhân**: File path sai hoặc file không tồn tại
**Giải pháp**: 
- Kiểm tra import paths
- Đảm bảo file tồn tại
- Kiểm tra case-sensitive (Windows vs Linux)

---

## ✅ Checklist Khắc Phục

- [ ] Server đã chạy (`npm run dev`)
- [ ] Port 3000 không bị chiếm
- [ ] Browser console không có lỗi
- [ ] Network tab không có failed requests
- [ ] Backend đã chạy (port 5000)
- [ ] CORS đã được enable
- [ ] Dependencies đã được cài đặt (`npm install`)
- [ ] Đã thử hard reload (Ctrl+Shift+R)
- [ ] Đã thử truy cập với hash: `#home`

---

## 🚀 Quick Fix

Nếu vẫn không được, thử:

```bash
# 1. Stop server (Ctrl+C)
# 2. Clear và reinstall
cd front-end
rm -rf node_modules
rm package-lock.json
npm install

# 3. Start lại
npm run dev

# 4. Mở browser với hash
# http://localhost:3000/#home
```

---

## 📞 Nếu Vẫn Không Được

1. **Copy error message** từ browser console
2. **Screenshot** browser console và network tab
3. **Kiểm tra** backend logs
4. **Kiểm tra** terminal output khi chạy `npm run dev`

