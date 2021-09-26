let mapleader=" "
syntax on 
set number
set norelativenumber
set nocursorline
set expandtab
set tabstop=4
set shiftwidth=4
set softtabstop=4

"自动换行"

set wrap

set showcmd

set wildmenu

set hlsearch
exec "nohlsearch"
set incsearch
set ignorecase

"智能大小写"
set smartcase

"operation motion"

map S :w<CR>
map R :source $MYVIMRC<CR>

map Q :q<CR>

map sl :set splitright<CR> :vsplit<CR>
map sj :set splitbelow<CR> :split<CR>

map <LEADER>h <C-w>h
map <LEADER>l <C-w>l
map <LEADER>j <C-w>j
map <LEADER>k <C-w>k
map <LEADER>4 :!javac %<CR>
map <LEADER>5 :!java %:r<CR>

"调节窗口大小"
map <left> :vertical resize-5<CR>
map <right> :vertical resize+5<CR>

map tu :tabe<CR>
map t- :-tabnext<CR>
map t= :+tabnext<CR>

noremap = n
noremap - N

inoremap ' ''<ESC>i
inoremap " ""<ESC>i
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap { {<CR>}<ESC>O
map ff :NERDTreeToggle<CR>

"ciw" 在词中删除词并写入

"插件安装"
call plug#begin('~/.vim/plugged')

Plug 'vim-airline/vim-airline'

Plug 'scrooloose/nerdtree', { 'on': 'NERDTreeToggle' }
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'https://github.com/Valloric/YouCompleteMe'

"Taglist
Plug 'majutsushi/tagbar', { 'on': 'TagbarOpenAutoClose' }
map <LEADER>j <C-w>map <LEADER>j <C-w>jj

" Error checking
Plug 'w0rp/ale'

" Undo Tree 文件修改历史
Plug 'mbbill/undotree/'


" ===
" === vim-indent-guide
" ===
let g:indent_guides_guide_size = 1
let g:indent_guides_start_level = 2
let g:indent_guides_enable_on_vim_startup = 1
let g:indent_guides_color_change_percent = 1
silent! unmap <LEADER>ig
autocmd WinEnter * silent! unmap <LEADER>ig

Plug 'srcery-colors/srcery-vim'
set termguicolors
let g:srcery_italic = 1
let g:srcery_transparent_background = 0
set t_Co=256
call plug#end()

"colorscheme snazzy
colorscheme srcery

let NERDTreeMapOpenExpl = ""
let NERDTreeMapUpdir = ""
let NERDTreeMapUpdirKeepOpen = "l"
let NERDTreeMapOpenSplit = ""
let NERDTreeOpenVSplit = ""
let NERDTreeMapActivateNode = "i"
let NERDTreeMapOpenInTab = "o"
let NERDTreeMapPreview = ""
let NERDTreeMapCloseDir = "n"
let NERDTreeMapChangeRoot = "y"

