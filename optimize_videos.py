import os
import subprocess

def optimize_video_assets():
    # 1. 获取脚本当前的绝对路径
    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_dir = os.path.join(base_dir, "assets", "videos")
    output_dir = os.path.join(base_dir, "assets", "videos_web")

    print(f"当前脚本位置: {base_dir}")
    print(f"正在查找视频源目录: {input_dir}")

    # 2. 检查源目录是否存在
    if not os.path.exists(input_dir):
        print(f"❌ 错误：找不到源文件夹 '{input_dir}'。请检查文件夹名称是否准确。")
        return

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"已创建输出目录: {output_dir}")

    # 3. 开始遍历
    found_files = False
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            if file.lower().endswith(('.mp4', '.mov', '.avi', '.mkv')):
                found_files = True
                input_path = os.path.join(root, file)
                rel_path = os.path.relpath(root, input_dir)
                target_dir = os.path.join(output_dir, rel_path)
                
                if not os.path.exists(target_dir):
                    os.makedirs(target_dir)

                output_filename = os.path.splitext(file)[0] + '.mp4'
                output_path = os.path.join(target_dir, output_filename)

                print(f"正在处理: {file}...")

                cmd = [
                    'ffmpeg', '-i', input_path,
                    '-c:v', 'libx264', 
                    '-crf', '26',
                    '-preset', 'faster',
                    '-tune', 'fastdecode',
                    '-pix_fmt', 'yuv420p',
                    '-c:a', 'aac', '-b:a', '128k',
                    '-movflags', '+faststart',
                    '-y', output_path
                ]

                try:
                    # 去掉 stdout=subprocess.DEVNULL，这样报错能直接打印出来
                    subprocess.run(cmd, check=True)
                    print(f"✅ 成功: {output_path}")
                except Exception as e:
                    print(f"❌ FFmpeg 运行出错: {e}")

    if not found_files:
        print("❓ 提示：在 assets/videos 文件夹里没看到任何视频文件（mp4/mov等）。")

if __name__ == "__main__":
    optimize_video_assets()