#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QPushButton>
#include "registershelter.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    QObject::connect(ui->pushButton, SIGNAL(clicked()),this, SLOT(clickedSlot()));
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::clickedSlot() {
    RegisterShelter* r = new RegisterShelter();
    this->close();
    r->show();
}

