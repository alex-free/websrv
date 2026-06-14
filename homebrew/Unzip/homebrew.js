/* Copyright (C) 2024 John Törnblom

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 3, or (at your option) any
later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; see the file COPYING. If not, see
<http://www.gnu.org/licenses/>.  */


async function main() {
    const PAYLOAD = window.workingDir + '/unzip.elf';

    return {
        mainText: "Unzip",
        secondaryText: 'Extract zip files',
        onclick: async () => {
            let zip = await pickFile('', 'Select zip file to extract...', true);
            if(!zip) {
                return;
            }

            if(!zip.startsWith('/')) {
                zip = ApiClient.getNetworkShareHttpProxyUrl(zip);
            }

            let extract_dir = await pickDirectory('', 'Select folder to extract to...', true);
            if(!extract_dir) {
                return;
            }
            

            if(!extract_dir.startsWith('/')) {
                extract_dir = ApiClient.getNetworkShareHttpProxyUrl(extract_dir);
            }

            return {
                path: PAYLOAD,
                args: ['-o', zip, '-d', extract_dir]
            };
        },
    };
}
